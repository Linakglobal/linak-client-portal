import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Edge-safe middleware with proper @supabase/ssr integration
export async function middleware(request: NextRequest) {
  try {
    // Demo mode: skip all auth checks
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL ===
        "https://placeholder.supabase.co" ||
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return NextResponse.next();
    }

    const pathname = request.nextUrl.pathname;

    // Define public routes that don't require authentication
    const publicRoutes = [
      "/",
      "/login",
      "/auth/callback",
      "/favicon.ico",
      "/robots.txt",
      "/sitemap.xml",
    ];

    // Check if current path is public
    const isPublicRoute = publicRoutes.some((route) => pathname === route);

    // Skip auth check for public routes
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // Create response to manage cookies
    const response = NextResponse.next();

    // Create Supabase client with edge-safe cookie adapter
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    // Get session from Supabase
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Redirect to login if no session on protected route
    if (!session) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Allow authenticated users to continue
    return response;
  } catch (error) {
    // On any middleware error, log and do not block navigation
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml (static assets)
     * - public folder assets
     * - auth/callback (auth flow)
     * - api/health (health check if exists)
     */
    "/((?!_next|favicon\\.ico|robots\\.txt|sitemap\\.xml|auth/callback|api/health|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
