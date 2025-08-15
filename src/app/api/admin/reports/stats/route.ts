import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Mock data for development when Supabase is not configured
const mockStats = {
  totalReports: 247,
  pendingReports: 42,
  verifiedReports: 189,
  rejectedReports: 16,
  totalRewardsDistributed: 4725000,
};

export async function GET() {
  try {
    // Check if environment variables are properly configured
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") ||
      process.env.SUPABASE_SERVICE_ROLE_KEY.includes("placeholder")
    ) {
      console.log("Using mock data - Supabase not configured");
      return NextResponse.json(mockStats);
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        cookies: {
          get(name: string) {
            return undefined;
          },
          set(name: string, value: string, options: any) {
            // No-op for service role
          },
          remove(name: string, options: any) {
            // No-op for service role
          },
        },
      }
    );

    const { data: reports, error } = await supabase
      .from("defamation_reports")
      .select("status, reward_amount");

    if (error) {
      console.error("Error fetching stats:", error);
      console.log("Falling back to mock data");
      return NextResponse.json(mockStats);
    }

    const stats = {
      totalReports: reports.length,
      pendingReports: reports.filter((r) => r.status === "pending").length,
      verifiedReports: reports.filter((r) => r.status === "verified").length,
      rejectedReports: reports.filter((r) => r.status === "rejected").length,
      totalRewardsDistributed: reports
        .filter((r) => r.status === "verified")
        .reduce((sum, r) => sum + (r.reward_amount || 0), 0),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("API Error:", error);
    console.log("Falling back to mock data due to error");
    return NextResponse.json(mockStats);
  }
}
