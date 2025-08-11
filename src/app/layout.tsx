import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LINAK Client Portal",
  description: "Access your personalized LINAK dashboard, manage orders, and explore our comprehensive range of linear actuator solutions designed for your business needs.",
  keywords: "LINAK, linear actuators, client portal, industrial automation, medical equipment",
  authors: [{ name: "LINAK" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
