"use client";

import { motion, useInView, useMotionValue, useTransform, useScroll, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v).toLocaleString("de-DE"),
  );
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, target, { duration, ease: "easeOut" });
    }
  }, [isInView, motionValue, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const STATS = [
  { key: "candidates", value: 10000, suffix: "+" },
  { key: "jobs", value: 500, suffix: "+" },
  { key: "uptime", value: 99.9, suffix: "%", isPercent: true },
  { key: "ai_speed", value: 3, prefix: "< ", suffix: "s" },
];

export function Stats() {
  const t = useTranslations("stats");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.3, 0.5], ["0%", "100%", "100%"]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 px-6">
      {/* Animated gradient lines */}
      <motion.div
        style={{ width: lineWidth }}
        className="absolute inset-x-0 top-0 mx-auto h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />
      <motion.div
        style={{ width: lineWidth }}
        className="absolute inset-x-0 bottom-0 mx-auto h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="text-center transition-all"
          >
            <div className="text-3xl font-bold text-text-primary md:text-4xl">
              {stat.isPercent ? (
                <span>{stat.value}{stat.suffix}</span>
              ) : (
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              )}
            </div>
            <div className="mt-2 text-sm text-text-secondary">
              {t(stat.key)}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
