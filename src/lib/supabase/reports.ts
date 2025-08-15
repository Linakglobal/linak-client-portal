import { supabase } from "./client";

// Types for defamation reports
export interface DefamationReport {
  id: string;
  client_name: string;
  client_email: string;
  client_id: string;
  post_link: string;
  screenshot_url?: string;
  explanation: string;
  status: "pending" | "verified" | "rejected" | "resolved";
  reward_amount: number;
  reward_status: "pending" | "approved" | "paid";
  created_at: string;
  verified_at?: string;
  verified_by?: string;
  notes?: string;
  metadata: Record<string, any>;
}

export interface ClientStatus {
  id: string;
  client_id: string;
  client_email: string;
  status: "regular" | "vip" | "express" | "blacklisted";
  reputation_score: number;
  total_reports_submitted: number;
  verified_reports: number;
  total_rewards_earned: number;
  blacklist_reason?: string;
  blacklisted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ClientReward {
  id: string;
  client_id: string;
  report_id: string;
  reward_type: "discount" | "upgrade" | "bonus";
  reward_value: number;
  reward_description?: string;
  status: "pending" | "approved" | "redeemed" | "expired";
  expires_at?: string;
  redeemed_at?: string;
  created_at: string;
}

export interface ReportSubmission {
  client_name: string;
  client_email: string;
  client_id: string;
  post_link: string;
  screenshot?: File;
  explanation: string;
}

/**
 * Submit a defamation report
 */
export async function submitDefamationReport(
  reportData: ReportSubmission
): Promise<{ data: DefamationReport | null; error: string | null }> {
  try {
    let screenshot_url: string | undefined;

    // Upload screenshot if provided
    if (reportData.screenshot) {
      const fileExt = reportData.screenshot.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("defamation-reports")
        .upload(fileName, reportData.screenshot, {
          contentType: reportData.screenshot.type,
        });

      if (uploadError) {
        return {
          data: null,
          error: `Failed to upload screenshot: ${uploadError.message}`,
        };
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("defamation-reports")
        .getPublicUrl(uploadData.path);

      screenshot_url = publicUrl;
    }

    // Insert the report
    const { data, error } = await supabase
      .from("defamation_reports")
      .insert([
        {
          client_name: reportData.client_name,
          client_email: reportData.client_email,
          client_id: reportData.client_id,
          post_link: reportData.post_link,
          screenshot_url,
          explanation: reportData.explanation,
        },
      ])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    // Update client status submission count
    await updateClientSubmissionCount(
      reportData.client_id,
      reportData.client_email
    );

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get reports for a specific client
 */
export async function getClientReports(
  clientEmail: string
): Promise<{ data: DefamationReport[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("defamation_reports")
      .select("*")
      .eq("client_email", clientEmail)
      .order("created_at", { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get client status and reputation
 */
export async function getClientStatus(
  clientId: string
): Promise<{ data: ClientStatus | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("client_status")
      .select("*")
      .eq("client_id", clientId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found"
      return { data: null, error: error.message };
    }

    return { data: data || null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get client rewards
 */
export async function getClientRewards(
  clientId: string
): Promise<{ data: ClientReward[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("client_rewards")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Update client submission count
 */
async function updateClientSubmissionCount(
  clientId: string,
  clientEmail: string
): Promise<void> {
  await supabase.rpc("upsert_client_submission", {
    p_client_id: clientId,
    p_client_email: clientEmail,
  });
}

/**
 * Check if post link already reported by this client
 */
export async function checkDuplicateReport(
  clientEmail: string,
  postLink: string
): Promise<{ isDuplicate: boolean; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("defamation_reports")
      .select("id")
      .eq("client_email", clientEmail)
      .eq("post_link", postLink)
      .limit(1);

    if (error) {
      return { isDuplicate: false, error: error.message };
    }

    return { isDuplicate: data.length > 0, error: null };
  } catch (error) {
    return {
      isDuplicate: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get report statistics for dashboard
 */
export async function getReportStats(): Promise<{
  data: {
    totalReports: number;
    verifiedReports: number;
    totalRewardsDistributed: number;
    successRate: number;
  } | null;
  error: string | null;
}> {
  try {
    const { data: reports, error: reportsError } = await supabase
      .from("defamation_reports")
      .select("status, reward_amount");

    if (reportsError) {
      return { data: null, error: reportsError.message };
    }

    const totalReports = reports.length;
    const verifiedReports = reports.filter(
      (r) => r.status === "verified"
    ).length;
    const totalRewardsDistributed = reports
      .filter((r) => r.status === "verified")
      .reduce((sum, r) => sum + r.reward_amount, 0);
    const successRate =
      totalReports > 0 ? Math.round((verifiedReports / totalReports) * 100) : 0;

    return {
      data: {
        totalReports,
        verifiedReports,
        totalRewardsDistributed,
        successRate,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
