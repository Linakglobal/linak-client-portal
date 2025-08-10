"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface FloatingParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: "circle" | "triangle" | "square";
}

export default function Advanced3DBackground({
  className = "",
  particleCount = 80,
}: {
  readonly className?: string;
  readonly particleCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<FloatingParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const colors = [
        "#64FFDA", // Teal
        "#BB86FC", // Purple
        "#03DAC6", // Cyan
        "#CF6679", // Pink
        "#FFD700", // Gold
        "#00E676", // Green
      ];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: ["circle", "triangle", "square"][
            Math.floor(Math.random() * 3)
          ] as "circle" | "triangle" | "square",
        });
      }
    };

    initParticles();

    // Mouse tracking
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Draw different shapes
    const drawParticle = (particle: FloatingParticle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      ctx.strokeStyle = particle.color;
      ctx.lineWidth = 1;

      switch (particle.type) {
        case "circle":
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          break;

        case "triangle": {
          ctx.beginPath();
          const size = particle.size * 1.5;
          ctx.moveTo(particle.x, particle.y - size);
          ctx.lineTo(particle.x - size, particle.y + size);
          ctx.lineTo(particle.x + size, particle.y + size);
          ctx.closePath();
          ctx.stroke();
          break;
        }

        case "square": {
          const squareSize = particle.size * 1.2;
          ctx.strokeRect(
            particle.x - squareSize,
            particle.y - squareSize,
            squareSize * 2,
            squareSize * 2
          );
          break;
        }
      }

      ctx.restore();
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      ctx.save();
      ctx.strokeStyle = "#64FFDA";
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];

          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );

          if (distance < 120) {
            ctx.globalAlpha = ((120 - distance) / 120) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    // Mouse interaction effect
    const drawMouseEffect = () => {
      ctx.save();

      // Create radial gradient around mouse
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        150
      );
      gradient.addColorStop(0, "rgba(100, 255, 218, 0.1)");
      gradient.addColorStop(0.5, "rgba(187, 134, 252, 0.05)");
      gradient.addColorStop(1, "rgba(100, 255, 218, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.restore();
    };

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Mouse attraction effect
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseRef.current.x, 2) +
            Math.pow(particle.y - mouseRef.current.y, 2)
        );

        if (mouseDistance < 150) {
          const force = (150 - mouseDistance) / 150;
          const angle = Math.atan2(
            mouseRef.current.y - particle.y,
            mouseRef.current.x - particle.x
          );
          particle.vx += Math.cos(angle) * force * 0.01;
          particle.vy += Math.sin(angle) * force * 0.01;
        }

        // Apply some damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary collision with soft bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Gentle floating animation
        particle.y += Math.sin(timestamp * 0.001 + particle.x * 0.01) * 0.1;
        particle.opacity =
          0.3 + Math.sin(timestamp * 0.002 + particle.x * 0.01) * 0.3;

        drawParticle(particle);
      });

      // Draw connections and effects
      drawConnections();
      drawMouseEffect();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount]);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {/* 3D-style gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-teal-500/5 to-transparent" />

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 left-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-16 h-16 border-2 border-teal-400/30 rotate-45" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-32"
        animate={{
          rotate: [360, 0],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-12 h-12 rounded-full border-2 border-purple-400/30" />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-1/4"
        animate={{
          rotate: [0, -360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 transform rotate-45" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20"
        animate={{
          rotate: [0, 180, 360],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-6 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full" />
      </motion.div>

      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
