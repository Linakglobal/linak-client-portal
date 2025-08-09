"use client";

import {
  useScrollAnimation,
  useParallax,
  use3DTilt,
} from "@/hooks/use-scroll-animation";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  readonly children: ReactNode;
  readonly animation?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "zoom-out"
    | "rotate";
  readonly delay?: number;
  readonly className?: string;
}

export function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const [ref, isVisible] = useScrollAnimation();

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      opacity: isVisible ? 1 : 0,
    };

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return { ...baseStyles, transform: "translateY(30px)" };
        case "fade-down":
          return { ...baseStyles, transform: "translateY(-30px)" };
        case "fade-left":
          return { ...baseStyles, transform: "translateX(30px)" };
        case "fade-right":
          return { ...baseStyles, transform: "translateX(-30px)" };
        case "zoom-in":
          return { ...baseStyles, transform: "scale(0.9)" };
        case "zoom-out":
          return { ...baseStyles, transform: "scale(1.1)" };
        case "rotate":
          return { ...baseStyles, transform: "rotate(-5deg)" };
        default:
          return baseStyles;
      }
    }

    return { ...baseStyles, transform: "none" };
  };

  return (
    <div ref={ref} style={getAnimationStyles()} className={className}>
      {children}
    </div>
  );
}

interface ParallaxSectionProps {
  readonly children: ReactNode;
  readonly speed?: number;
  readonly className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className = "",
}: ParallaxSectionProps) {
  const [ref, offset] = useParallax(speed);

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className={className}
    >
      {children}
    </div>
  );
}

interface TiltCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function TiltCard({ children, className = "", style }: TiltCardProps) {
  const ref = use3DTilt();

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}

interface StaggeredListProps {
  readonly children: ReactNode[];
  readonly staggerDelay?: number;
  readonly className?: string;
  readonly keyPrefix?: string;
}

export function StaggeredList({
  children,
  staggerDelay = 0.1,
  className = "",
  keyPrefix = "stagger",
}: StaggeredListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedSection
          key={`${keyPrefix}-${index}`}
          animation="fade-up"
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
}

interface FloatingElementProps {
  readonly children: ReactNode;
  readonly amplitude?: number;
  readonly speed?: number;
  readonly className?: string;
}

export function FloatingElement({
  children,
  amplitude = 10,
  speed = 0.01,
  className = "",
}: FloatingElementProps) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "floating" : ""}`}
      style={
        {
          "--float-amplitude": `${amplitude}px`,
          "--float-speed": `${speed}s`,
        } as any
      }
    >
      {children}
    </div>
  );
}
