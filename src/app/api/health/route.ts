import { NextResponse } from "next/server";

/**
 * Health check endpoint for monitoring and deployment verification
 * GET /api/health - Returns basic health status
 */
export async function GET() {
  try {
    // Basic health checks
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "unknown",
      environment: process.env.NODE_ENV || "unknown",
      uptime: process.uptime(),
      memory: {
        used:
          Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) /
          100,
        total:
          Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) /
          100,
      },
    };

    // Optional: Add database connectivity check
    // This could be expanded to include Supabase connection test

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Optionally support HEAD method for lightweight checks
export async function HEAD() {
  try {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Health check HEAD failed:", error);
    return new NextResponse(null, { status: 500 });
  }
}
