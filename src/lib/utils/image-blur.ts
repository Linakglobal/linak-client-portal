/**
 * Utility functions for generating blur data URLs for Next.js Image optimization
 */

// Generate a simple blur placeholder for SVG logos
export function generateLogoBlur(color: string = "#6f42c1"): string {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" fill="${color}" opacity="0.3"/>
      <rect x="10" y="10" width="20" height="20" fill="${color}" opacity="0.6" rx="4"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

// Generate gradient blur placeholder
export function generateGradientBlur(
  startColor: string = "#6f42c1",
  endColor: string = "#38bdf8"
): string {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blur-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${startColor};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${endColor};stop-opacity:0.8" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" fill="url(#blur-gradient)"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

// Common blur placeholders for the LINAK brand
export const LINAK_BLUR_PLACEHOLDERS = {
  logo: generateLogoBlur("#6f42c1"),
  gradient: generateGradientBlur("#6f42c1", "#38bdf8"),
  purple: generateLogoBlur("#8b5cf6"),
  blue: generateLogoBlur("#3b82f6"),
} as const;
