import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { reportId, status, notes } = await request.json();

    if (!reportId || !status || !["verified", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );

    // Get the current report details
    const { data: report, error: fetchError } = await supabase
      .from("defamation_reports")
      .select("*")
      .eq("id", reportId)
      .single();

    if (fetchError || !report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Update the report status
    const updateData: {
      status: string;
      notes: string | null;
      verified_at: string;
      reward_status?: string;
    } = {
      status,
      notes: notes || null,
      verified_at: new Date().toISOString(),
    };

    if (status === "verified") {
      updateData.reward_status = "approved";
    }

    const { error: updateError } = await supabase
      .from("defamation_reports")
      .update(updateData)
      .eq("id", reportId);

    if (updateError) {
      console.error("Error updating report:", updateError);
      return NextResponse.json(
        { error: "Failed to update report" },
        { status: 500 }
      );
    }

    // Send email notification to client
    if (process.env.RESEND_API_KEY) {
      try {
        const emailContent =
          status === "verified"
            ? {
                subject: `✅ Your Defamation Report Has Been Verified - Report ID: ${report.client_id}`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 10px;">
                  <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <h2 style="color: #4a5568; text-align: center; margin-bottom: 20px;">
                      🎉 Report Verified Successfully!
                    </h2>
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      Dear ${report.client_name},
                    </p>
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      Great news! Your defamation report has been <strong style="color: #22c55e;">verified and approved</strong> by our team.
                    </p>
                    
                    <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
                      <h3 style="color: #22c55e; margin: 0 0 10px 0;">Reward Details:</h3>
                      <p style="color: #4a5568; margin: 5px 0;"><strong>Report ID:</strong> ${
                        report.client_id
                      }</p>
                      <p style="color: #4a5568; margin: 5px 0;"><strong>Reward Amount:</strong> ₹${report.reward_amount.toLocaleString()}</p>
                      <p style="color: #4a5568; margin: 5px 0;"><strong>Reward Status:</strong> Approved</p>
                      <p style="color: #4a5568; margin: 5px 0;"><strong>Processed On:</strong> ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    ${
                      notes
                        ? `
                      <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                        <h4 style="color: #f59e0b; margin: 0 0 10px 0;">Admin Review Notes:</h4>
                        <p style="color: #92400e; font-style: italic;">"${notes}"</p>
                      </div>
                    `
                        : ""
                    }
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      Your reward discount will be processed and applied to your account within 2-3 business days. You will receive a separate email with the discount code and redemption instructions.
                    </p>
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      Thank you for helping us maintain LINAK's reputation and for being a valued member of our community.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}/rewards" 
                         style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        View Your Reports
                      </a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                    
                    <div style="text-align: center; color: #718096; font-size: 14px;">
                      <p style="margin: 5px 0;"><strong>LINAK Migration Service</strong></p>
                      <p style="margin: 5px 0;">Your trusted partner in global migration</p>
                      <p style="margin: 5px 0;">
                        <a href="mailto:support@linakmigration.com" style="color: #667eea;">support@linakmigration.com</a> | 
                        <a href="https://linakmigration.com" style="color: #667eea;">linakmigration.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              `,
              }
            : {
                subject: `Report Review Update - Report ID: ${report.client_id}`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 10px;">
                  <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                    <h2 style="color: #4a5568; text-align: center; margin-bottom: 20px;">
                      Report Review Complete
                    </h2>
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      Dear ${report.client_name},
                    </p>
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      Thank you for submitting a defamation report. After careful review, we have completed our assessment.
                    </p>
                    
                    <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
                      <h3 style="color: #ef4444; margin: 0 0 10px 0;">Review Result:</h3>
                      <p style="color: #4a5568; margin: 5px 0;"><strong>Report ID:</strong> ${
                        report.client_id
                      }</p>
                      <p style="color: #4a5568; margin: 5px 0;"><strong>Status:</strong> Not Approved</p>
                      <p style="color: #4a5568; margin: 5px 0;"><strong>Reviewed On:</strong> ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    ${
                      notes
                        ? `
                      <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                        <h4 style="color: #f59e0b; margin: 0 0 10px 0;">Review Notes:</h4>
                        <p style="color: #92400e; font-style: italic;">"${notes}"</p>
                      </div>
                    `
                        : ""
                    }
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      While we appreciate your submission, this particular report did not meet our criteria for defamatory content rewards.
                    </p>
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6;">
                      We encourage you to continue helping us identify genuine defamatory content. Future reports that meet our guidelines will be eligible for rewards.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}/rewards" 
                         style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                        Submit Another Report
                      </a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
                    
                    <div style="text-align: center; color: #718096; font-size: 14px;">
                      <p style="margin: 5px 0;"><strong>LINAK Migration Service</strong></p>
                      <p style="margin: 5px 0;">Your trusted partner in global migration</p>
                      <p style="margin: 5px 0;">
                        <a href="mailto:support@linakmigration.com" style="color: #667eea;">support@linakmigration.com</a> | 
                        <a href="https://linakmigration.com" style="color: #667eea;">linakmigration.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              `,
              };

        await resend.emails.send({
          from: "LINAK Reports <noreply@linakmigration.com>",
          to: [report.client_email],
          ...emailContent,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't fail the API call if email fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
