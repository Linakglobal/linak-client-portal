"use client";

import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DarkPageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  title?: string;
}

export default function DarkPageLayout({
  children,
  showBackButton = true,
  showHomeButton = true,
  title,
}: DarkPageLayoutProps) {
  return (
    <div className="landing-hero-bg min-h-screen relative">
      {/* Navigation Bar */}
      <div className="absolute top-6 left-6 right-6 z-50">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            {showBackButton && (
              <Button
                className="landing-button-primary"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {showHomeButton && (
              <Link href="/">
                <Button className="landing-button-secondary">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            )}
          </div>

          {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-20">{children}</div>
    </div>
  );
}
