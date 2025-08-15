"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: "dot" | "line" | "hex";
}

const CyberParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.min(150, window.innerWidth / 8);

      for (let i = 0; i < particleCount; i++) {
        const colors = ["#00d9ff", "#00ff88", "#0066cc", "#00ffff"];
        const types: ("dot" | "line" | "hex")[] = ["dot", "line", "hex"];

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    };

    const drawHexagon = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      const hexSize = size * 2;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const hexX = x + Math.cos(angle) * hexSize;
        const hexY = y + Math.sin(angle) * hexSize;
        if (i === 0) ctx.moveTo(hexX, hexY);
        else ctx.lineTo(hexX, hexY);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawConnections = (
      particles: Particle[],
      index: number,
      particle: Particle,
      ctx: CanvasRenderingContext2D
    ) => {
      particles.slice(index + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = ((120 - distance) / 120) * 0.2;
          ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Subtle opacity animation
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));

        // Set drawing style
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;

        // Draw different particle types
        switch (particle.type) {
          case "dot": {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();

            // Add glow effect
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = particle.size * 2;
            ctx.fill();
            ctx.shadowBlur = 0;
            break;
          }

          case "line": {
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particle.x + particle.size * 10, particle.y);
            ctx.stroke();
            break;
          }

          case "hex": {
            drawHexagon(ctx, particle.x, particle.y, particle.size);
            break;
          }
        }

        ctx.globalAlpha = 1;

        // Draw connections between nearby particles
        drawConnections(particlesRef.current, index, particle, ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default CyberParticlesBackground;
