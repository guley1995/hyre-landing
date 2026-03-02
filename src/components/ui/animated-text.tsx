"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  gradient?: boolean;
}

export function AnimatedText({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
  gradient = false,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={cn("flex flex-wrap", gradient && "gradient-text", className)}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="mr-[0.25em] inline-flex overflow-hidden">
          {word.split("").map((char, charIndex) => {
            const totalIndex =
              words.slice(0, wordIndex).join("").length + charIndex;
            return (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial={{ y: "100%", opacity: 0 }}
                animate={
                  isInView
                    ? { y: "0%", opacity: 1 }
                    : { y: "100%", opacity: 0 }
                }
                transition={{
                  delay: delay + totalIndex * 0.03,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
