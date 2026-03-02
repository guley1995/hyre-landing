"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { GradientBlob } from "./ui/gradient-blob";
import { FloatingParticles } from "./ui/floating-particles";
import { MagneticButton } from "./ui/magnetic-button";

export function CTA() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Scroll-linked blob movements
  const blob1Y = useTransform(scrollYProgress, [0, 1], [50, -80]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-30, -100]);
  const blob1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  // Mouse tracking for background distortion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(smoothMX, [-0.5, 0.5], [-30, 30]);
  const bgY = useTransform(smoothMY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    function handleMouse(e: globalThis.MouseEvent) {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    }
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-32 px-6"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-accent/10 to-accent/5" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <FloatingParticles count={25} />

      <motion.div style={{ x: bgX, y: blob1Y, scale: blob1Scale }} className="absolute left-1/4 top-1/2 -translate-y-1/2">
        <GradientBlob
          className="relative"
          size="500px"
          color1="rgba(99,102,241,0.15)"
          color2="rgba(139,92,246,0.08)"
        />
      </motion.div>
      <motion.div style={{ x: bgY, y: blob2Y }} className="absolute right-1/4 top-1/3">
        <GradientBlob
          className="relative"
          size="400px"
          color1="rgba(6,182,212,0.1)"
          color2="rgba(99,102,241,0.05)"
        />
      </motion.div>

      <motion.div style={{ y, scale, opacity }} className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-text-primary"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-4 max-w-lg text-lg text-text-secondary"
        >
          {t("subtitle")}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "rgba(99,102,241,0.4)" }}
            type="email"
            placeholder={t("placeholder")}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-accent/40 focus:ring-2 focus:ring-accent/20 sm:w-72"
          />
          <MagneticButton
            as="button"
            strength={0.3}
            className="rounded-xl bg-gradient-to-r from-accent to-purple-500 px-8 py-3.5 font-medium text-white"
          >
            {t("button")}
          </MagneticButton>
        </motion.form>
      </motion.div>
    </section>
  );
}
