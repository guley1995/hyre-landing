"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useMotionValue, useSpring, frame } from "framer-motion";

interface MouseContextValue {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
}

const MouseContext = createContext<MouseContextValue | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 50, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 50, damping: 20, mass: 0.5 });

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      frame.read(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    }
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [x, y]);

  return (
    <MouseContext.Provider value={{ x, y, smoothX, smoothY }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error("useMouse must be used within MouseProvider");
  return ctx;
}
