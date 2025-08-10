"use client";

import React from "react";
import { MainNavigation } from "./MainNavigation";

interface ImmigrationPageWrapperProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly showBackgroundPattern?: boolean;
  readonly showNavigation?: boolean;
}

export function ImmigrationPageWrapper({
  children,
  className = "",
  showBackgroundPattern = true,
  showNavigation = true,
}: ImmigrationPageWrapperProps) {
  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-red-950/20 to-black ${className}`}
    >
      {/* Navigation */}
      {showNavigation && <MainNavigation />}

      {/* Dark Red & Black Background Elements */}
      {showBackgroundPattern && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated gradient orbs with dark red accents */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-red-900/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-800/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-950/25 rounded-full blur-2xl animate-pulse delay-500" />

          {/* Dark tech grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ImmigrationPageWrapper;
