import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    
    // Allow public routes without authentication
    const publicRoutes = ['/login', '/auth', '/api/auth'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    
    if (isPublicRoute) {
      return NextResponse.next();
    }
    
    // Check for session (simplified for demo - in production use proper session validation)
    const hasSession = request.cookies.get('demo-session') || 
                      request.cookies.get('sb-access-token') ||
                      request.cookies.get('supabase-auth-token');
    
    // Redirect to login for protected routes without session
    if (!hasSession && !isPublicRoute && pathname !== '/') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl, 307);
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)  
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
