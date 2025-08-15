"use client";

import React from "react";

interface EmojiProps {
  size?: number;
  className?: string;
}

// Diverse Handshake Emoji
export const DiverseHandshakeEmoji: React.FC<EmojiProps> = ({
  size = 32,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient
        id="handshakeGradient1"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <linearGradient
        id="handshakeGradient2"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
    </defs>

    {/* Background circle */}
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="#ffffff"
      stroke="#e5e7eb"
      strokeWidth="2"
    />

    {/* Left hand (lighter skin tone) */}
    <path
      d="M6 18C6 16 7 14 9 13L12 12C13 12 14 13 14 14V16L16 16"
      fill="url(#handshakeGradient1)"
      stroke="#d97706"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Right hand (darker skin tone) */}
    <path
      d="M26 18C26 16 25 14 23 13L20 12C19 12 18 13 18 14V16L16 16"
      fill="url(#handshakeGradient2)"
      stroke="#92400e"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Connection point */}
    <circle
      cx="16"
      cy="16"
      r="2"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="1"
    />

    {/* Sparkles around handshake */}
    <path d="M10 10L11 8L12 10L11 12L10 10Z" fill="#fbbf24" />
    <path d="M22 10L23 8L24 10L23 12L22 10Z" fill="#fbbf24" />
    <path d="M8 22L9 20L10 22L9 24L8 22Z" fill="#f59e0b" />
    <path d="M24 22L25 20L26 22L25 24L24 22Z" fill="#f59e0b" />
  </svg>
);

// Family Together Emoji
export const FamilyTogetherEmoji: React.FC<EmojiProps> = ({
  size = 32,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="familyBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ddd6fe" />
        <stop offset="100%" stopColor="#c4b5fd" />
      </linearGradient>
    </defs>

    {/* Background circle */}
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="url(#familyBg)"
      stroke="#8b5cf6"
      strokeWidth="2"
    />

    {/* Parent 1 (left) */}
    <circle
      cx="10"
      cy="12"
      r="3"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="2"
    />
    <rect
      x="7"
      y="18"
      width="6"
      height="8"
      rx="3"
      fill="#3b82f6"
      stroke="#1d4ed8"
      strokeWidth="2"
    />

    {/* Parent 2 (right) */}
    <circle
      cx="22"
      cy="12"
      r="3"
      fill="#92400e"
      stroke="#78350f"
      strokeWidth="2"
    />
    <rect
      x="19"
      y="18"
      width="6"
      height="8"
      rx="3"
      fill="#ec4899"
      stroke="#db2777"
      strokeWidth="2"
    />

    {/* Child (center) */}
    <circle
      cx="16"
      cy="15"
      r="2.5"
      fill="#fde047"
      stroke="#eab308"
      strokeWidth="2"
    />
    <rect
      x="13"
      y="20"
      width="6"
      height="6"
      rx="3"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="2"
    />

    {/* Hearts above family */}
    <path
      d="M14 6C14 4 16 4 16 6C16 4 18 4 18 6C18 8 16 10 16 10C16 10 14 8 14 6Z"
      fill="#ef4444"
    />

    {/* Arms connecting (simplified) */}
    <path
      d="M13 20L10 18M19 20L22 18"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Key Holder Emoji
export const KeyHolderEmoji: React.FC<EmojiProps> = ({
  size = 32,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="keyBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fdba74" />
      </linearGradient>
      <linearGradient id="keyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>

    {/* Background circle */}
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="url(#keyBg)"
      stroke="#f97316"
      strokeWidth="2"
    />

    {/* Person's head */}
    <circle
      cx="16"
      cy="10"
      r="4"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="2"
    />

    {/* Person's body */}
    <rect
      x="12"
      y="16"
      width="8"
      height="10"
      rx="4"
      fill="#3b82f6"
      stroke="#1d4ed8"
      strokeWidth="2"
    />

    {/* Arms holding key */}
    <ellipse
      cx="8"
      cy="18"
      rx="2"
      ry="4"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="1"
    />
    <ellipse
      cx="24"
      cy="18"
      rx="2"
      ry="4"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="1"
    />

    {/* Key */}
    <circle
      cx="16"
      cy="20"
      r="2"
      fill="url(#keyGradient)"
      stroke="#d97706"
      strokeWidth="1"
    />
    <rect x="14" y="22" width="4" height="1" fill="url(#keyGradient)" />
    <rect x="14" y="24" width="2" height="1" fill="url(#keyGradient)" />
    <rect x="16" y="24" width="2" height="1" fill="url(#keyGradient)" />

    {/* Sparkles around key */}
    <path d="M20 16L21 14L22 16L21 18L20 16Z" fill="#fbbf24" />
    <path d="M10 16L11 14L12 16L11 18L10 16Z" fill="#fbbf24" />
    <path d="M16 8L17 6L18 8L17 10L16 8Z" fill="#22c55e" />
  </svg>
);

// Welcome Gesture Emoji
export const WelcomeGestureEmoji: React.FC<EmojiProps> = ({
  size = 32,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="welcomeBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bfdbfe" />
        <stop offset="100%" stopColor="#93c5fd" />
      </linearGradient>
    </defs>

    {/* Background circle */}
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="url(#welcomeBg)"
      stroke="#3b82f6"
      strokeWidth="2"
    />

    {/* Person's head */}
    <circle
      cx="16"
      cy="10"
      r="4"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="2"
    />

    {/* Smile */}
    <path
      d="M13 12C13 12 14.5 14 16 14C17.5 14 19 12 19 12"
      stroke="#d97706"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Eyes */}
    <circle cx="14" cy="9" r="0.5" fill="#374151" />
    <circle cx="18" cy="9" r="0.5" fill="#374151" />

    {/* Person's body */}
    <rect
      x="12"
      y="16"
      width="8"
      height="10"
      rx="4"
      fill="#22c55e"
      stroke="#16a34a"
      strokeWidth="2"
    />

    {/* Welcoming arms (open wide) */}
    <ellipse
      cx="6"
      cy="18"
      rx="3"
      ry="2"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="1"
      transform="rotate(-30 6 18)"
    />
    <ellipse
      cx="26"
      cy="18"
      rx="3"
      ry="2"
      fill="#fbbf24"
      stroke="#f59e0b"
      strokeWidth="1"
      transform="rotate(30 26 18)"
    />

    {/* Welcome hearts */}
    <path
      d="M8 12C8 10 10 10 10 12C10 10 12 10 12 12C12 14 10 16 10 16C10 16 8 14 8 12Z"
      fill="#ef4444"
    />
    <path
      d="M20 12C20 10 22 10 22 12C22 10 24 10 24 12C24 14 22 16 22 16C22 16 20 14 20 12Z"
      fill="#ef4444"
    />
  </svg>
);

// Support Network Emoji
export const SupportNetworkEmoji: React.FC<EmojiProps> = ({
  size = 32,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="networkBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ecfdf5" />
        <stop offset="100%" stopColor="#d1fae5" />
      </linearGradient>
    </defs>

    {/* Background circle */}
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="url(#networkBg)"
      stroke="#22c55e"
      strokeWidth="2"
    />

    {/* Central person */}
    <circle
      cx="16"
      cy="16"
      r="3"
      fill="#3b82f6"
      stroke="#1d4ed8"
      strokeWidth="2"
    />

    {/* Surrounding support people */}
    <circle
      cx="8"
      cy="8"
      r="2.5"
      fill="#f59e0b"
      stroke="#d97706"
      strokeWidth="1"
    />
    <circle
      cx="24"
      cy="8"
      r="2.5"
      fill="#ec4899"
      stroke="#db2777"
      strokeWidth="1"
    />
    <circle
      cx="24"
      cy="24"
      r="2.5"
      fill="#8b5cf6"
      stroke="#7c3aed"
      strokeWidth="1"
    />
    <circle
      cx="8"
      cy="24"
      r="2.5"
      fill="#06b6d4"
      stroke="#0891b2"
      strokeWidth="1"
    />

    {/* Connection lines */}
    <path
      d="M16 16L8 8M16 16L24 8M16 16L24 24M16 16L8 24"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Supporting hands reaching toward center */}
    <path
      d="M11 11L13 13"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M21 11L19 13"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M21 21L19 19"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11 21L13 19"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Unity symbol in center */}
    <path
      d="M14 16L16 14L18 16L16 18L14 16Z"
      fill="#ffffff"
      stroke="#16a34a"
      strokeWidth="1"
    />
  </svg>
);

// New Beginning Emoji
export const NewBeginningEmoji: React.FC<EmojiProps> = ({
  size = 32,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="sunriseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>

    {/* Background circle */}
    <circle
      cx="16"
      cy="16"
      r="15"
      fill="url(#sunriseGradient)"
      stroke="#d97706"
      strokeWidth="2"
    />

    {/* Sun */}
    <circle
      cx="16"
      cy="12"
      r="4"
      fill="#fef9c3"
      stroke="#eab308"
      strokeWidth="2"
    />

    {/* Sun rays */}
    <path
      d="M16 2V6M24 4L22 6M30 12H26M24 20L22 18M16 26V22M8 20L10 18M2 12H6M8 4L10 6"
      stroke="#eab308"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Growing plant/seedling */}
    <path
      d="M16 20V28"
      stroke="#22c55e"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M13 22C13 20 15 18 17 20"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M19 24C19 22 17 20 15 22"
      fill="none"
      stroke="#22c55e"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Ground line */}
    <path d="M4 28H28" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />

    {/* Hope sparkles */}
    <path d="M6 16L7 14L8 16L7 18L6 16Z" fill="#ffffff" />
    <path d="M26 16L27 14L28 16L27 18L26 16Z" fill="#ffffff" />
    <path d="M10 8L11 6L12 8L11 10L10 8Z" fill="#ffffff" />
  </svg>
);

export const ImmigrationEmojiSet = {
  DiverseHandshake: DiverseHandshakeEmoji,
  FamilyTogether: FamilyTogetherEmoji,
  KeyHolder: KeyHolderEmoji,
  WelcomeGesture: WelcomeGestureEmoji,
  SupportNetwork: SupportNetworkEmoji,
  NewBeginning: NewBeginningEmoji,
};
