"use client";
import React, { useEffect, useRef, useState } from "react";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesProps> = ({
  id = "sparkles",
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 1200,
  className = "",
  particleColor = "#FFFFFF",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateDimensions = () => {
      if (canvas.parentElement) {
        const { width, height } = canvas.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
      growing: boolean;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random();
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
        this.growing = Math.random() > 0.5;
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        // Fade in and out
        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 1) {
            this.growing = false;
          }
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0) {
            this.growing = true;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particleCount = Math.floor(
      (dimensions.width * dimensions.height) / particleDensity
    );
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(dimensions.width, dimensions.height));
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set background
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions.width, dimensions.height, background, minSize, maxSize, particleDensity, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

