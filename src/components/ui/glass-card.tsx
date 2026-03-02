"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, borderColor: "rgba(99,102,241,0.2)" } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "glass rounded-2xl p-6",
        hover && "cursor-default transition-shadow hover:glow-accent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
