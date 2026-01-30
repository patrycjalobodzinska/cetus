"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StarGradientButtonProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  speed?: string;
  starColor?: string;
}

export const StarGradientButton = ({
  children,
  className,
  containerClassName,
  speed = "6s",
  starColor = "#3b82f6",
}: StarGradientButtonProps) => {
  // Obliczamy połowę czasu dla drugiej fali gwiazd
  const halfSpeed = parseFloat(speed) / 2 + "s";

  return (
    <button
      className={cn(
        "group relative inline-block overflow-hidden rounded-[20px] p-[1.5px] bg-transparent border-none cursor-pointer",
        containerClassName
      )}
    >
      {/* 1. SZARY BORDER */}
      <div
        className="absolute inset-0 bg-gray-200 transition-opacity duration-500 group-hover:opacity-0"
        style={{ borderRadius: "inherit" }}
      />

      {/* 2. SYSTEM GWIAZD */}
      <div className="absolute inset-0 z-0 transition-opacity duration-500 group-hover:opacity-0">

        {/* DOLNA LINIA */}
        <div
          className="star-glow animate-star-bottom"
          style={{ background: `radial-gradient(circle, ${starColor}, transparent 70%)`, animationDuration: speed }}
        />
        <div
          className="star-glow animate-star-bottom"
          style={{
            background: `radial-gradient(circle, ${starColor}, transparent 70%)`,
            animationDuration: speed,
            animationDelay: halfSpeed
          }}
        />

        {/* GÓRNA LINIA */}
        <div
          className="star-glow animate-star-top"
          style={{ background: `radial-gradient(circle, ${starColor}, transparent 70%)`, animationDuration: speed }}
        />
        <div
          className="star-glow animate-star-top"
          style={{
            background: `radial-gradient(circle, ${starColor}, transparent 70%)`,
            animationDuration: speed,
            animationDelay: halfSpeed
          }}
        />
      </div>

      {/* 3. GRADIENT BORDER NA HOVER */}
      <div
        className="gradient-anim absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, #2563eb, #60a5fa, #1d4ed8, #3b82f6, #2563eb)`,
          backgroundSize: "200% 100%",
          zIndex: 1
        }}
      />

      {/* 4. CONTENT */}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center px-8 py-4 rounded-[19px] bg-gray-50 text-sm font-semibold text-gray-900 transition-colors group-hover:bg-gray-50/95",
          className
        )}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes star-bottom {
          0% { transform: translateX(150%); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateX(-150%); opacity: 0; }
        }
        @keyframes star-top {
          0% { transform: translateX(-150%); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateX(150%); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .star-glow {
          position: absolute;
          width: 140px;
          height: 45px;
          filter: blur(5px);
          will-change: transform, opacity;
        }

        .animate-star-bottom {
          bottom: -15px;
          animation: star-bottom linear infinite;
        }

        .animate-star-top {
          top: -15px;
          animation: star-top linear infinite;
        }

        .group:hover .gradient-anim {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </button>
  );
};

export default StarGradientButton;