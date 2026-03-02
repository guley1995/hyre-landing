"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function Badge({ children, className, glow = false }: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent-light",
        glow && "pulse-glow",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
      {children}
    </motion.div>
  );
}
