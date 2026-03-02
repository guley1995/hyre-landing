"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface GradientBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  size?: string;
}

export function GradientBlob({
  className,
  color1 = "rgba(99,102,241,0.15)",
  color2 = "rgba(139,92,246,0.1)",
  size = "600px",
}: GradientBlobProps) {
  return (
    <motion.div
      animate={{
        x: [0, 30, -20, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1}, ${color2}, transparent 70%)`,
      }}
    />
  );
}
