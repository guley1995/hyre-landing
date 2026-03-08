"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { AnimatedText } from "./ui/animated-text";
import { cn } from "@/lib/cn";
import { MagneticButton } from "./ui/magnetic-button";

interface PricingTier {
  nameKey: string;
  price: number;
  users: string;
  candidates: string;
  activeJobs: string;
  aiCredits: string;
  features: string[];
  highlighted?: boolean;
  contactSales?: boolean;
}

const TIERS: PricingTier[] = [
  {
    nameKey: "professional_name",
    price: 299,
    users: "25",
    candidates: "5.000",
    activeJobs: "50",
    aiCredits: "5.000",
    features: [
      "feature_pipeline",
      "feature_analytics",
      "feature_portal",
      "feature_ai",
      "feature_multichannel",
      "feature_api",
    ],
  },
  {
    nameKey: "enterprise_name",
    price: 799,
    users: "unlimited",
    candidates: "50.000",
    activeJobs: "500",
    aiCredits: "50.000",
    highlighted: true,
    features: [
      "feature_pipeline",
      "feature_analytics",
      "feature_portal",
      "feature_ai",
      "feature_multichannel",
      "feature_whitelabel",
      "feature_api",
      "feature_priority",
    ],
  },
  {
    nameKey: "whitelabel_name",
    price: 1499,
    users: "unlimited",
    candidates: "unlimited",
    activeJobs: "unlimited",
    aiCredits: "unlimited",
    contactSales: true,
    features: [
      "feature_pipeline",
      "feature_analytics",
      "feature_portal",
      "feature_ai",
      "feature_multichannel",
      "feature_whitelabel",
      "feature_api",
      "feature_custom_domain",
      "feature_priority",
      "feature_dedicated",
    ],
  },
];

function PricingCard({ tier, index, t }: { tier: PricingTier; index: number; t: ReturnType<typeof useTranslations> }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
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
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      {/* Dynamic hover glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: tier.highlighted
            ? `radial-gradient(400px circle at ${glowX}% ${glowY}%, rgba(99,102,241,0.25), transparent 60%)`
            : `radial-gradient(400px circle at ${glowX}% ${glowY}%, rgba(99,102,241,0.1), transparent 60%)`,
        }}
      />

      {/* Animated border for highlighted card */}
      {tier.highlighted && (
        <div className="animated-border absolute -inset-[1px] rounded-2xl opacity-50" />
      )}

      <div
        className={cn(
          "relative flex h-full flex-col rounded-2xl p-6",
          tier.highlighted
            ? "border-2 border-accent/40 bg-accent/5 shadow-lg shadow-accent/10"
            : "glass",
        )}
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Popular badge */}
        {tier.highlighted && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-purple-500 px-4 py-1 text-xs font-medium text-white"
          >
            {t("popular")}
          </motion.div>
        )}

        {/* Name */}
        <h3 className="text-lg font-semibold text-text-primary">
          {t(tier.nameKey)}
        </h3>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-text-primary">
            {tier.price.toLocaleString("de-DE")}€
          </span>
          <span className="text-text-muted">{t("monthly")}</span>
        </div>

        {/* Limits */}
        <div className="mt-6 space-y-2 text-sm">
          {[
            { label: t("users"), value: tier.users === "unlimited" ? t("unlimited") : tier.users },
            { label: t("candidates"), value: tier.candidates === "unlimited" ? t("unlimited") : tier.candidates },
            { label: t("active_jobs"), value: tier.activeJobs === "unlimited" ? t("unlimited") : tier.activeJobs },
            { label: t("ai_credits"), value: tier.aiCredits === "unlimited" ? t("unlimited") : tier.aiCredits },
          ].map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-text-muted">{item.label}</span>
              <span className="font-medium text-text-primary">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-white/5" />

        {/* Features */}
        <ul className="flex-1 space-y-2">
          {tier.features.map((featureKey, i) => (
            <motion.li
              key={featureKey}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <svg
                className="h-4 w-4 flex-shrink-0 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t(featureKey)}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          <MagneticButton
            href="#contact"
            strength={0.2}
            className={cn(
              "block w-full rounded-xl py-3 text-center text-sm font-medium transition-all",
              tier.highlighted
                ? "bg-gradient-to-r from-accent to-purple-500 text-white hover:shadow-lg hover:shadow-accent/25"
                : tier.contactSales
                  ? "border border-white/10 text-text-primary hover:border-white/20 hover:bg-white/5"
                  : "bg-white/5 text-text-primary hover:bg-white/10",
            )}
          >
            {tier.contactSales ? t("contact_sales") : t("cta")}
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  const t = useTranslations("pricing");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <section id="pricing" ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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
            className="mx-auto mt-4 max-w-xl text-lg text-text-secondary"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {TIERS.map((tier, index) => (
            <PricingCard key={tier.nameKey} tier={tier} index={index} t={t} />
          ))}
        </div>

        {/* Success fee notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <div className="glass rounded-2xl p-6">
            <div className="mb-2 flex items-center justify-center gap-2">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg font-semibold text-text-primary">{t("success_fee_title")}</span>
            </div>
            <p className="text-sm text-text-secondary">{t("success_fee_desc")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
