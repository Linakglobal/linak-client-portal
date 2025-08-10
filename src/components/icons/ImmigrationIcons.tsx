"use client";

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

// New Home Icon - Represents finding a new home
export const NewHomeIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="newHomeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4ade80" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <path
      d="M12 2L2 7v15h6v-6h8v6h6V7L12 2z"
      fill="url(#newHomeGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <circle cx="15" cy="13" r="1" fill="#ffffff" />
    <path
      d="M6 11h2M16 11h2"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Travel Icon - Represents journey and movement
export const TravelIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="travelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="url(#travelGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 12C8 12 9.5 10 12 10C14.5 10 16 12 16 12C16 12 14.5 14 12 14C9.5 14 8 12 8 12Z"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="2" fill="#ffffff" />
    <path
      d="M12 6V2M12 22V18M18 12H22M2 12H6"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Community Icon - Represents belonging and connection
export const CommunityIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient
        id="communityGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <circle
      cx="9"
      cy="7"
      r="4"
      fill="url(#communityGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="15"
      cy="11"
      r="3"
      fill="url(#communityGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M3 21V19C3 16.7909 4.79086 15 7 15H11C13.2091 15 15 16.7909 15 19V21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 21V20C16 18.8954 16.8954 18 18 18H20C21.1046 18 22 18.8954 22 20V21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Family Icon - Represents family unity and support
export const FamilyIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="familyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
    </defs>
    <circle
      cx="6"
      cy="6"
      r="3"
      fill="url(#familyGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="18"
      cy="6"
      r="3"
      fill="url(#familyGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="12"
      cy="13"
      r="2"
      fill="url(#familyGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M6 22V20C6 18.8954 6.89543 18 8 18H16C17.1046 18 18 18.8954 18 20V22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M1 18V17C1 15.8954 1.89543 15 3 15H9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M23 18V17C23 15.8954 22.1046 15 21 15H15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Paperwork Icon - Represents documentation and legal processes
export const PaperworkIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient
        id="paperworkGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    <rect
      x="4"
      y="2"
      width="16"
      height="20"
      rx="2"
      fill="url(#paperworkGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M8 7H16M8 11H16M8 15H13"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle
      cx="17"
      cy="17"
      r="3"
      fill="#22c55e"
      stroke="#ffffff"
      strokeWidth="1.5"
    />
    <path
      d="M15.5 17L16.5 18L18.5 16"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Language Learning Icon - Represents education and adaptation
export const LanguageIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="languageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
    </defs>
    <rect
      x="3"
      y="3"
      width="18"
      height="14"
      rx="2"
      fill="url(#languageGradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M7 7H17M7 11H15M7 15H12"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 21L12 17L21 21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="13" r="1" fill="#ffffff" />
  </svg>
);

// Globe with Bird Icon - Main emblem representing freedom and global movement
export const GlobeBirdIcon: React.FC<IconProps> = ({
  size = 48,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#0891b2" />
        <stop offset="100%" stopColor="#164e63" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Globe */}
    <circle
      cx="24"
      cy="24"
      r="18"
      fill="url(#globeGradient)"
      stroke="currentColor"
      strokeWidth="2"
      filter="url(#glow)"
    />

    {/* Globe lines */}
    <path d="M6 24H42M24 6V42" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
    <ellipse
      cx="24"
      cy="24"
      rx="18"
      ry="9"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1"
      opacity="0.4"
    />
    <ellipse
      cx="24"
      cy="24"
      rx="9"
      ry="18"
      fill="none"
      stroke="#ffffff"
      strokeWidth="1"
      opacity="0.4"
    />

    {/* Soaring Bird - continuous line wrapping around globe */}
    <path
      d="M8 16C12 12 16 10 20 12C24 14 28 16 32 14C36 12 40 16 42 20C40 24 36 26 32 28C28 30 24 32 20 30C16 28 12 24 10 20C8 18 6 18 8 16Z"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#glow)"
    />

    {/* Bird details */}
    <path
      d="M20 12L18 10M32 14L34 12"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Export all icons as a collection
export const ImmigrationIconSet = {
  NewHome: NewHomeIcon,
  Travel: TravelIcon,
  Community: CommunityIcon,
  Family: FamilyIcon,
  Paperwork: PaperworkIcon,
  Language: LanguageIcon,
  GlobeBird: GlobeBirdIcon,
};
