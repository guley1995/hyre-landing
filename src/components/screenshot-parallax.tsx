"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FloatingParticles } from "./ui/floating-particles";

interface ScreenshotSectionProps {
  index: number;
  titleKey: string;
  subtitleKey: string;
  bullets: string[];
  direction: "left" | "right" | "center";
  mockupType: "kanban" | "analytics" | "portal";
}

function ScreenshotMockup({ type }: { type: string }) {
  if (type === "kanban") {
    return (
      <div className="flex h-full flex-col rounded-lg border border-white/5 bg-bg-primary">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
          <div className="ml-auto h-5 w-24 rounded bg-accent/20" />
        </div>
        <div className="flex flex-1 gap-3 overflow-hidden p-4">
          {[
            { label: "Applied", color: "bg-blue-500/20", cards: 4 },
            { label: "Screening", color: "bg-yellow-500/20", cards: 3 },
            { label: "Interview", color: "bg-purple-500/20", cards: 2 },
            { label: "Offer", color: "bg-green-500/20", cards: 1 },
          ].map((col) => (
            <div key={col.label} className="flex flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`h-5 w-16 rounded ${col.color}`} />
                <span className="text-[10px] text-text-muted">{col.cards}</span>
              </div>
              {[...Array(col.cards)].map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                  <div className="h-3 w-4/5 rounded bg-white/8" />
                  <div className="h-2 w-3/5 rounded bg-white/5" />
                  <div className="flex items-center gap-1.5">
                    <div className="h-5 w-5 rounded-full bg-accent/30" />
                    <div className="h-2 w-8 rounded bg-white/5" />
                    <div className="ml-auto h-4 w-8 rounded-full bg-green-500/20 text-center text-[8px] leading-4 text-green-400">92%</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "analytics") {
    return (
      <div className="flex h-full flex-col rounded-lg border border-white/5 bg-bg-primary">
        <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-green-500/60" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3 p-4">
          {[
            { label: "Time to Hire", value: "23d", change: "-12%" },
            { label: "Cost per Hire", value: "2.4k", change: "-8%" },
            { label: "Placements", value: "47", change: "+24%" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
              <div className="h-2 w-16 rounded bg-white/5 mb-2" />
              <div className="text-lg font-bold text-text-primary">{kpi.value}</div>
              <div className={`text-xs ${kpi.change.startsWith("+") ? "text-green-400" : "text-cyan-400"}`}>{kpi.change}</div>
            </div>
          ))}
          <div className="col-span-2 rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="mb-2 h-2 w-20 rounded bg-white/5" />
            <div className="flex h-24 items-end gap-1">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-accent/40 to-accent/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="h-20 w-20 rounded-full border-8 border-accent/30" style={{ borderTopColor: "rgb(99,102,241)", borderRightColor: "rgb(139,92,246)" }} />
          </div>
        </div>
      </div>
    );
  }

  // Portal
  return (
    <div className="flex h-full flex-col rounded-lg border border-white/5 bg-white">
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <div className="h-3 w-3 rounded-full bg-green-400" />
        <div className="ml-4 h-4 w-40 rounded bg-gray-200 text-center text-[8px] text-gray-400 leading-4">karriere.acme.hyre.hr</div>
      </div>
      <div className="flex-1 p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-indigo-500" />
          <div className="h-4 w-32 rounded bg-gray-800" />
        </div>
        <div className="mb-6 h-3 w-48 rounded bg-gray-300" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="h-4 w-48 rounded bg-gray-800 mb-2" />
              <div className="h-3 w-32 rounded bg-gray-200 mb-3" />
              <div className="flex gap-2">
                <div className="h-5 w-14 rounded-full bg-indigo-100" />
                <div className="h-5 w-14 rounded-full bg-green-100" />
                <div className="h-5 w-20 rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParallaxSection({
  index,
  titleKey,
  subtitleKey,
  bullets,
  direction,
  mockupType,
}: ScreenshotSectionProps) {
  const t = useTranslations("screenshots");
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // More aggressive parallax transforms
  const imgY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.75, 1.02, 1.02, 0.9]);
  const imgRotateY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    direction === "left" ? [15, 0, 0, -5] : direction === "right" ? [-15, 0, 0, 5] : [0, 0, 0, 0],
  );
  const imgRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -3]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.1, 0.35], [60, 0]);
  const textX = useTransform(
    scrollYProgress,
    [0.1, 0.35],
    direction === "left" ? [-40, 0] : direction === "right" ? [40, 0] : [0, 0],
  );

  // Mouse tracking for 3D tilt on screenshots
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConf = { stiffness: 200, damping: 30 };
  const smoothMX = useSpring(mouseX, springConf);
  const smoothMY = useSpring(mouseY, springConf);
  const mouseTiltY = useTransform(smoothMX, [-0.5, 0.5], [-6, 6]);
  const mouseTiltX = useTransform(smoothMY, [-0.5, 0.5], [4, -4]);

  useEffect(() => {
    function handleMouse(e: globalThis.MouseEvent) {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    }
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const isReversed = direction === "right";

  return (
    <div ref={sectionRef} className="relative min-h-[80vh] py-20">
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row ${
          isReversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Text with slide-in and parallax */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, x: textX }}
          className="flex-1 space-y-6"
        >
          <motion.h3
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-text-primary"
          >
            {t(titleKey)}
          </motion.h3>
          <p className="text-lg text-text-secondary">{t(subtitleKey)}</p>
          <ul className="space-y-3">
            {bullets.map((bulletKey, i) => (
              <motion.li
                key={bulletKey}
                initial={{ opacity: 0, x: direction === "right" ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 text-text-secondary"
              >
                <svg
                  className="mt-1 h-5 w-5 flex-shrink-0 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {t(bulletKey)}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Screenshot with mouse-tracking 3D + scroll parallax */}
        <motion.div
          style={{
            y: imgY,
            scale: imgScale,
            rotateY: imgRotateY,
            rotateX: imgRotateX,
            perspective: 1200,
          }}
          className="flex-1"
        >
          {/* Animated gradient border */}
          <div className="relative">
            <div className="animated-border absolute -inset-[1px] rounded-xl opacity-40" />
            <motion.div
              style={{
                rotateY: mouseTiltY,
                rotateX: mouseTiltX,
                transformPerspective: 1200,
              }}
            >
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-bg-elevated to-bg-secondary p-3">
                  <ScreenshotMockup type={mockupType} />
                </div>
              </div>
            </motion.div>
            {/* Reflection glow */}
            <div className="absolute -bottom-8 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-accent/10 blur-2xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ScreenshotParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const sections: ScreenshotSectionProps[] = [
    {
      index: 0,
      titleKey: "section1_title",
      subtitleKey: "section1_subtitle",
      bullets: ["section1_bullet1", "section1_bullet2", "section1_bullet3"],
      direction: "left",
      mockupType: "kanban",
    },
    {
      index: 1,
      titleKey: "section2_title",
      subtitleKey: "section2_subtitle",
      bullets: ["section2_bullet1", "section2_bullet2", "section2_bullet3"],
      direction: "right",
      mockupType: "analytics",
    },
    {
      index: 2,
      titleKey: "section3_title",
      subtitleKey: "section3_subtitle",
      bullets: ["section3_bullet1", "section3_bullet2", "section3_bullet3"],
      direction: "center",
      mockupType: "portal",
    },
  ];

  return (
    <section id="product" ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Background particles for this section */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <FloatingParticles count={20} />
      </motion.div>

      {sections.map((section) => (
        <ParallaxSection key={section.index} {...section} />
      ))}
    </section>
  );
}
