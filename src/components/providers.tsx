"use client";

import { type ReactNode } from "react";
import { MouseProvider } from "./ui/mouse-tracker";
import { CursorGlow } from "./ui/cursor-glow";
import { CustomCursor } from "./ui/custom-cursor";
import { RightClickGuard } from "./ui/right-click-guard";
import { LoadingScreen } from "./ui/loading-screen";
import { ScrollProgress } from "./ui/scroll-progress";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MouseProvider>
      <LoadingScreen />
      <ScrollProgress />
      <RightClickGuard />
      <CustomCursor />
      <CursorGlow />
      {children}
    </MouseProvider>
  );
}
