"use client";

import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatedText } from "./ui/animated-text";
import { cn } from "@/lib/cn";

const FEATURE_ICONS = [
  // Brain - CV Parsing
  <svg key="brain" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs><path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" /><path d="M10 21h4" /><path d="M12 17v-5" /><path d="M9.5 12.5L12 10l2.5 2.5" /></svg>,
  // Columns - Pipeline
  <svg key="cols" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad2)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs><rect x="3" y="3" width="5" height="18" rx="1" /><rect x="10" y="3" width="5" height="12" rx="1" /><rect x="17" y="3" width="5" height="15" rx="1" /></svg>,
  // Globe - Portal
  <svg key="globe" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad3)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  // Chart - Analytics
  <svg key="chart" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad4)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs><path d="M3 3v18h18" /><path d="M7 16l4-6 4 3 5-7" /></svg>,
  // LinkedIn
  <svg key="linkedin" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad5)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>,
  // MessageCircle - Multi-Channel
  <svg key="msg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad6)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" /></svg>,
  // Shield - GDPR
  <svg key="shield" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad7)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad7" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  // Rss - Feeds
  <svg key="rss" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="url(#grad8)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><defs><linearGradient id="grad8" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>,
];

const FEATURE_KEYS = [
  "cv_parsing",
  "pipeline",
  "portal",
  "analytics",
  "linkedin",
  "multichannel",
  "gdpr",
  "feeds",
] as const;

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const glowX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  function handleMouse(e: MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, type: "spring" }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ z: 30 }}
      className="group relative"
    >
      {/* Dynamic glow that follows cursor */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glowX}% ${glowY}%, rgba(99,102,241,0.15), transparent 60%)`,
        }}
      />
      <div className={cn(
        "relative h-full rounded-2xl p-6",
        "glass",
        "transition-all duration-300",
        "hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5",
      )}>
        <div style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const t = useTranslations("features");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const gridY = useTransform(scrollYProgress, [0.1, 0.4], [80, 0]);

  return (
    <section id="features" ref={sectionRef} className="relative py-32 px-6">
      {/* Subtle gradient divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-7xl">
        {/* Header with parallax */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 text-center">
          <AnimatedText
            text={t("title")}
            as="h2"
            className="justify-center text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight"
          />
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Grid with scroll parallax */}
        <motion.div
          style={{ y: gridY }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {FEATURE_KEYS.map((key, index) => (
            <TiltCard key={key} index={index}>
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {FEATURE_ICONS[index]}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-text-primary">
                {t(`${key}_title`)}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {t(`${key}_desc`)}
              </p>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
