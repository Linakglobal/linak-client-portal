import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Immigration Support Portal - Welcome Home",
  description:
    "Comprehensive immigration support services helping families find new homes, navigate documentation, learn languages, and build communities. Your journey to a new beginning starts here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-smooth">
        {children}
        <Toaster position="top-right" richColors closeButton theme="dark" />
      </body>
    </html>
  );
}
