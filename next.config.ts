import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Re-enable ESLint during builds for code quality
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Re-enable TypeScript checks for type safety
    ignoreBuildErrors: false,
  },
  experimental: {
    // Enable typed routes for better development experience
    typedRoutes: true,
    // Optimize bundle size
    optimizePackageImports: [
      "@heroicons/react",
      "framer-motion",
      "lucide-react",
    ],
  },
  images: {
    // Enable modern image formats for better performance
    formats: ["image/webp", "image/avif"],
    // Allow SVG images safely
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimized device and image sizes for responsive design
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add domains for external images if needed in future
    remotePatterns: [],
  },
  // Enable compression for better performance
  compress: true,
  // Enable source maps in development
  productionBrowserSourceMaps: false,
};

export default nextConfig;
