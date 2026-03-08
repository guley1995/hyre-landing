"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 500, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 28 });
  const trailX = useSpring(x, { stiffness: 120, damping: 20 });
  const trailY = useSpring(y, { stiffness: 120, damping: 20 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    function handleMouse(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    }

    window.addEventListener("mousemove", handleMouse, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [x, y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 10,
            height: isHovering ? 48 : 10,
            borderRadius: "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white"
          style={{ opacity: 0.9 }}
        />
      </motion.div>

      {/* Trail ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 64 : 36,
            height: isHovering ? 64 : 36,
            opacity: isHovering ? 0.3 : 0.15,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="rounded-full border border-white/40"
        />
      </motion.div>
    </>
  );
}
