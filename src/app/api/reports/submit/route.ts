import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const reportData = {
      client_name: formData.get("name") as string,
      client_email: formData.get("email") as string,
      client_id: formData.get("clientId") as string,
      post_link: formData.get("postLink") as string,
      explanation: formData.get("explanation") as string,
    };

    // Validate required fields
    if (
      !reportData.client_name ||
      !reportData.client_email ||
      !reportData.client_id ||
      !reportData.post_link ||
      !reportData.explanation
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if report already exists for this post URL and client
    const { data: existingReport } = await supabase
      .from("defamation_reports")
      .select("id")
      .eq("client_email", reportData.client_email)
      .eq("post_link", reportData.post_link)
      .single();

    if (existingReport) {
      return NextResponse.json(
        { error: "You have already reported this post" },
        { status: 400 }
      );
    }

    // Handle screenshot upload if present
    let screenshotUrl = null;
    const screenshot = formData.get("screenshot") as File;

    if (screenshot) {
      const fileName = `${Date.now()}-${screenshot.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("defamation-reports")
        .upload(fileName, screenshot, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Screenshot upload error:", uploadError);
      } else {
        screenshotUrl = uploadData.path;
      }
    }

    // Insert report into database
    const { data: report, error: insertError } = await supabase
      .from("defamation_reports")
      .insert({
        ...reportData,
        screenshot_url: screenshotUrl,
        metadata: {
          user_agent: request.headers.get("user-agent"),
          submitted_at: new Date().toISOString(),
          ip_hash: "hashed_for_privacy",
        },
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to submit report" },
        { status: 500 }
      );
    }

    // Send email notification to management
    try {
      await resend.emails.send({
        from: "reports@linakmigration.com",
        to: ["management@linakmigration.com", "admin@linakmigration.com"],
        subject: `🚨 New Defamation Report Submitted - ${report.client_id}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8e44ad;">New Defamation Report Submitted</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Report Details:</h3>
              <p><strong>Client Name:</strong> ${report.client_name}</p>
              <p><strong>Client ID:</strong> ${report.client_id}</p>
              <p><strong>Client Email:</strong> ${report.client_email}</p>
              <p><strong>Post URL:</strong> <a href="${
                report.post_link
              }" target="_blank">${report.post_link}</a></p>
              <p><strong>Submitted:</strong> ${new Date(
                report.created_at
              ).toLocaleString()}</p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4>Client's Explanation:</h4>
              <p>${report.explanation}</p>
            </div>
            
            ${
              screenshotUrl
                ? `
              <div style="margin: 20px 0;">
                <p><strong>Screenshot:</strong> <a href="${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/defamation-reports/${screenshotUrl}" target="_blank">View Screenshot</a></p>
              </div>
            `
                : ""
            }
            
            <div style="margin: 30px 0; padding: 20px; background: #d1ecf1; border-radius: 8px;">
              <p><strong>Action Required:</strong></p>
              <ol>
                <li>Review the reported post and evidence</li>
                <li>Verify if the content is actually defamatory</li>
                <li>Update report status in admin panel</li>
                <li>Process reward if report is valid</li>
              </ol>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/reports/${
          report.id
        }" 
                 style="background: #8e44ad; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Review Report in Admin Panel
              </a>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Email notification error:", emailError);
      // Don't fail the request if email fails
    }

    // Send confirmation email to client
    try {
      await resend.emails.send({
        from: "noreply@linakmigration.com",
        to: [reportData.client_email],
        subject: "✅ Report Submitted Successfully - LINAK Migration",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #8e44ad;">Thank You for Protecting Our Community</h2>
            
            <p>Dear ${reportData.client_name},</p>
            
            <p>Your defamation report has been successfully submitted and is now under review by our team.</p>
            
            <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3>Report Summary:</h3>
              <p><strong>Report ID:</strong> ${report.id}</p>
              <p><strong>Submitted:</strong> ${new Date(
                report.created_at
              ).toLocaleString()}</p>
              <p><strong>Status:</strong> Pending Review</p>
              <p><strong>Potential Reward:</strong> ₹25,000 discount (if verified)</p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4>What happens next?</h4>
              <ol>
                <li>Our team will review your report within 24-48 hours</li>
                <li>We'll verify the authenticity of the defamatory content</li>
                <li>If verified, your reward will be processed automatically</li>
                <li>You'll receive a confirmation email once the review is complete</li>
              </ol>
            </div>
            
            <p>Thank you for helping us maintain the integrity of LINAK Migration Service.</p>
            
            <p>Best regards,<br>
            <strong>LINAK Migration Service Team</strong></p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Client confirmation email error:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Report submitted successfully",
      reportId: report.id,
    });
  } catch (error) {
    console.error("Report submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
