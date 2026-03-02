"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatedText } from "./ui/animated-text";
import { Badge } from "./ui/badge";
import { GradientBlob } from "./ui/gradient-blob";
import { FloatingParticles } from "./ui/floating-particles";
import { MagneticButton } from "./ui/magnetic-button";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Mouse tracking for 3D tilt on screenshot
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const screenshotTiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const screenshotTiltX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);

  // Multi-layer scroll parallax
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const trustY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const screenshotY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const screenshotScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const screenshotScrollRotateX = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Scroll-linked blob movements
  const blob1X = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob2X = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const blob1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.3, 0.8]);
  const blob2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 1.4]);
  const blob3X = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Badge scale on scroll
  const badgeScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    function handleMouse(e: globalThis.MouseEvent) {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100lvh] flex-col items-center overflow-hidden pt-24"
    >
      {/* Background effects */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
        <div className="dot-grid absolute inset-0" />
        <FloatingParticles count={50} />

        {/* Scroll-linked animated gradient blobs */}
        <motion.div
          style={{ x: blob1X, y: blob1Y, scale: blob1Scale }}
          className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
        >
          <GradientBlob
            className="relative"
            size="800px"
            color1="rgba(99,102,241,0.15)"
            color2="rgba(139,92,246,0.08)"
          />
        </motion.div>
        <motion.div
          style={{ x: blob2X, y: blob2Y, scale: blob2Scale }}
          className="absolute left-1/4 top-2/3"
        >
          <GradientBlob
            className="relative"
            size="400px"
            color1="rgba(6,182,212,0.1)"
            color2="rgba(99,102,241,0.05)"
          />
        </motion.div>

        {/* Extra blob for depth */}
        <motion.div
          style={{ x: blob3X, y: blob3Y }}
          className="absolute right-1/4 top-1/3"
        >
          <GradientBlob
            className="relative"
            size="300px"
            color1="rgba(236,72,153,0.06)"
            color2="rgba(99,102,241,0.04)"
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-6 text-center">
        {/* Badge with scroll fade */}
        <motion.div style={{ scale: badgeScale, opacity: badgeOpacity }}>
          <Badge glow className="mb-8 mt-8">
            {t("badge")}
          </Badge>
        </motion.div>

        {/* Headline with parallax layers */}
        <motion.div style={{ y: titleY }}>
          <AnimatedText
            text={t("title1")}
            as="h1"
            className="justify-center text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-tight"
          />
          <AnimatedText
            text={t("title2")}
            as="h1"
            delay={0.3}
            gradient
            className="justify-center text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-tight"
          />
        </motion.div>

        {/* Subtitle with blur-to-focus entrance + parallax */}
        <motion.p
          style={{ y: subtitleY }}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          {t("subtitle")}
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          style={{ y: ctaY }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <MagneticButton
            href="#contact"
            strength={0.4}
            className="rounded-xl bg-gradient-to-r from-accent to-purple-500 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-accent/20"
          >
            <span className="relative z-10">{t("cta_primary")}</span>
          </MagneticButton>
          <MagneticButton
            href="#product"
            strength={0.3}
            className="rounded-xl border border-white/10 px-8 py-3.5 text-base font-medium text-text-primary hover:border-white/20 hover:bg-white/5"
          >
            {t("cta_secondary")}
          </MagneticButton>
        </motion.div>

        {/* Trust indicators with stagger */}
        <motion.div
          style={{ y: trustY }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-text-muted"
        >
          {[
            { icon: <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, text: t("trust_gdpr") },
            { icon: <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21V3h18v18H3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" /></svg>, text: t("trust_germany") },
            { icon: <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, text: t("trust_ai") },
          ].map((item, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.15, duration: 0.4 }}
              className="flex items-center gap-2"
            >
              {item.icon}
              {item.text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Screenshot mockup with mouse-tracking 3D tilt */}
      <motion.div
        style={{
          y: screenshotY,
          scale: screenshotScale,
          rotateX: screenshotScrollRotateX,
          perspective: 1200,
        }}
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 mx-6 mt-12 w-full max-w-5xl"
      >
        {/* Animated gradient border */}
        <div className="animated-border absolute -inset-[1px] rounded-xl opacity-60" />

        <motion.div
          style={{
            rotateY: screenshotTiltY,
            rotateX: screenshotTiltX,
            transformPerspective: 1200,
          }}
          className="relative"
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-bg-primary">
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-bg-elevated to-bg-secondary p-4">
              <div className="flex h-full flex-col rounded-lg border border-white/5 bg-bg-primary">
                {/* Top bar */}
                <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, type: "spring" }} className="h-3 w-3 rounded-full bg-red-500/60" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7, type: "spring" }} className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, type: "spring" }} className="h-3 w-3 rounded-full bg-green-500/60" />
                  <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 192 }} transition={{ delay: 1.9, duration: 0.5 }} className="ml-4 h-5 rounded bg-white/5" />
                </div>
                {/* Content area */}
                <div className="flex flex-1 gap-4 p-4">
                  {/* Sidebar */}
                  <div className="hidden w-48 space-y-3 sm:block">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.0 + i * 0.08, duration: 0.4 }}
                        className={`h-8 rounded-lg ${i === 1 ? "bg-accent/20 border border-accent/30" : "bg-white/5"}`}
                      />
                    ))}
                  </div>
                  {/* Main content - Kanban columns */}
                  <div className="flex flex-1 gap-3 overflow-hidden">
                    {["bg-accent/10", "bg-purple-500/10", "bg-cyan-500/10", "bg-green-500/10"].map(
                      (color, colIdx) => (
                        <div key={colIdx} className="flex min-w-0 flex-1 flex-col gap-2">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.0 + colIdx * 0.12, type: "spring" }}
                            className={`h-6 w-20 rounded ${color}`}
                          />
                          {[...Array(3 - colIdx % 2)].map((_, cardIdx) => (
                            <motion.div
                              key={cardIdx}
                              initial={{ opacity: 0, y: 20, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ delay: 2.2 + colIdx * 0.12 + cardIdx * 0.08, duration: 0.4, type: "spring" }}
                              className="space-y-2 rounded-lg border border-white/5 bg-white/[0.02] p-3"
                            >
                              <div className="h-3 w-3/4 rounded bg-white/10" />
                              <div className="h-2 w-1/2 rounded bg-white/5" />
                              <div className="flex gap-1">
                                <div className="h-4 w-4 rounded-full bg-accent/20" />
                                <div className="h-4 w-12 rounded bg-white/5" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reflection glow underneath */}
        <div className="absolute -bottom-12 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 -bottom-1 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
      </motion.div>
    </section>
  );
}
