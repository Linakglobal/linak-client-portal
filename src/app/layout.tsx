import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LINAK Client Portal",
  description: "Modern client portal for LINAK linear actuator solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
