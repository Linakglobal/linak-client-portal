import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // For demo purposes, skip authentication on client-portal routes
  // In production, this would check for valid auth tokens
  
  const { pathname } = request.nextUrl;
  
  // Allow public routes
  const publicRoutes = [
    "/",
    "/login",
    "/auth/callback",
    "/api",
    "/reports",
    "/rewards", 
    "/notes",
    "/immigration-icons-demo",
    "/migration-service",
    "/molecular-table-demo"
  ];
  
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + "/")
  );
  
  // Protected client-portal routes
  if (pathname.startsWith("/(client-portal)") || 
      ["/dashboard", "/documents", "/upload", "/profile", "/destinations", "/admin"].some(route => 
        pathname === route || pathname.startsWith(route + "/")
      )) {
    
    // For demo: allow access without real authentication
    // In production, check for valid session/token here
    return NextResponse.next();
  }
  
  if (!isPublicRoute) {
    // Redirect to login with return URL
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
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
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};