"use client";

import { motion } from "framer-motion";
import { useMouse } from "./mouse-tracker";

export function CursorGlow() {
  const { smoothX, smoothY } = useMouse();

  return (
    <>
      {/* Primary glow - follows cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)",
          filter: "blur(1px)",
        }}
      />
      {/* Tight spotlight */}
      <motion.div
        className="pointer-events-none fixed z-50 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />
    </>
  );
}
