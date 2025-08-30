import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LINAK Client Portal",
  description: "LINAK Client Portal with VHSY Coin integration",
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
