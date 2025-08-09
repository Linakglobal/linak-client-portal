import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Mock data for development when Supabase is not configured
const mockReports = [
  {
    id: 1,
    title: "False Claims About Immigration Consultant",
    description:
      "Someone posted false information about our services on social media",
    reporter_name: "John Smith",
    reporter_email: "john@example.com",
    evidence_urls: ["https://example.com/screenshot1.png"],
    status: "pending",
    priority: "high",
    reward_amount: 25000,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Defamatory Review on Google",
    description: "Fake negative review damaging our reputation",
    reporter_name: "Jane Doe",
    reporter_email: "jane@example.com",
    evidence_urls: ["https://example.com/screenshot2.png"],
    status: "verified",
    priority: "medium",
    reward_amount: 25000,
    created_at: "2024-01-14T15:30:00Z",
    updated_at: "2024-01-15T09:00:00Z",
  },
  {
    id: 3,
    title: "Misleading Information in Forum",
    description: "False information about immigration processes shared online",
    reporter_name: "Mike Johnson",
    reporter_email: "mike@example.com",
    evidence_urls: ["https://example.com/screenshot3.png"],
    status: "rejected",
    priority: "low",
    reward_amount: 0,
    created_at: "2024-01-13T12:00:00Z",
    updated_at: "2024-01-14T14:00:00Z",
  },
];

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
      return NextResponse.json(mockReports);
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
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

    const { data: reports, error } = await supabase
      .from("defamation_reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reports:", error);
      return NextResponse.json(
        { error: "Failed to fetch reports" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reports });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
