import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = await createClient(request);

    // Handle demo mode
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL ===
        "https://placeholder.supabase.co" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL
    ) {
      // In demo mode, allow all requests through without authentication checks
      return NextResponse.next();
    }

    // Type guard for supabase client
    if (!supabase || typeof supabase !== "object" || !("auth" in supabase)) {
      return NextResponse.next();
    }

    // Refresh session if expired - required for Server Components
    const authClient = supabase as {
      auth: { getSession: () => Promise<{ data: { session: unknown } }> };
    };
    const {
      data: { session },
    } = await authClient.auth.getSession();

    const isAuthPage = request.nextUrl.pathname.startsWith("/login");
    const isProtectedPage =
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/documents") ||
      request.nextUrl.pathname.startsWith("/upload") ||
      request.nextUrl.pathname.startsWith("/profile");

    // If user is not authenticated and trying to access protected pages
    if (!session && isProtectedPage) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is authenticated and trying to access auth pages
    if (session && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If accessing root and authenticated, redirect to dashboard
    if (session && request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    // If there's an error, allow the request to continue
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
