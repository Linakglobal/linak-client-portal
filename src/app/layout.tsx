import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Ultra-premium font system for better visibility and aesthetics
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${poppins.variable} font-sans antialiased text-smooth`}
      >
        {children}
        <Toaster position="top-right" richColors closeButton theme="dark" />
      </body>
    </html>
  );
}
