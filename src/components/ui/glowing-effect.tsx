"use client";

import React, { useRef, useEffect, useState } from "react";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  spread = 60,
  glow = true,
  disabled = false,
  proximity = 100,
  inactiveZone = 0.5,
}) => {
  const effectRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled || !effectRef.current) return;

    const card = effectRef.current.parentElement;
    if (!card) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={effectRef}
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
      style={{
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Main glow effect */}
      <div
        className="absolute h-full w-full"
        style={{
          background: glow
            ? `radial-gradient(${spread * 2}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 70%)`
            : "none",
          transition: "background 0.15s ease-out",
        }}
      />
      {/* Border glow effect */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${spread * 3}px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 197, 253, 0.3), transparent 50%)`,
          mixBlendMode: "screen",
          transition: "background 0.15s ease-out",
        }}
      />
    </div>
  );
};

