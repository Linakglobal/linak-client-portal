import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://linak-client-portal.com";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/destinations", "/migration-service"],
      disallow: ["/login", "/dashboard", "/documents", "/profile", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
