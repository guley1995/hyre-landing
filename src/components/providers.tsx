"use client";

import { type ReactNode } from "react";
import { MouseProvider } from "./ui/mouse-tracker";
import { CursorGlow } from "./ui/cursor-glow";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MouseProvider>
      <CursorGlow />
      {children}
    </MouseProvider>
  );
}
