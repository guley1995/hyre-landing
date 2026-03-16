"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { staggerContainer, staggerItem } from "@/lib/animations";

const serviceIcons = [
  // Acquire - Target/Bullseye
  <svg key="acquire" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>,
  // Recruiting Automation - Zap
  <svg key="automation" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  // Platform & Tools - Layout
  <svg key="platform" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>,
  // Compliance - Shield
  <svg key="compliance" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
];

const serviceColors = [
  "from-indigo-500/20 to-purple-500/20",
  "from-cyan-500/20 to-blue-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-green-500/20 to-emerald-500/20",
];

const serviceBorderColors = [
  "border-indigo-500/20 hover:border-indigo-500/40",
  "border-cyan-500/20 hover:border-cyan-500/40",
  "border-purple-500/20 hover:border-purple-500/40",
  "border-green-500/20 hover:border-green-500/40",
];

const serviceLinks = [
  "/acquire",
  "/dienstleistungen",
  "/plattform",
  "/dienstleistungen",
] as const;

export function ServiceAreas() {
  const t = useTranslations("serviceAreas");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const areas = [0, 1, 2, 3].map((i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    bullets: [0, 1, 2].map((j) => t(`items.${i}.bullets.${j}`)),
    icon: serviceIcons[i],
    gradient: serviceColors[i],
    border: serviceBorderColors[i],
    link: serviceLinks[i],
    linkLabel: t(`items.${i}.linkLabel`),
  }));

  return (
    <section className="relative py-24 lg:py-32" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {t("subtitle")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
            {t("description")}
          </p>
        </motion.div>

        {/* Service area cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2"
        >
          {areas.map((area, i) => (
            <motion.div key={i} variants={staggerItem}>
              <Link href={area.link} className="group block h-full">
                <div
                  className={`relative h-full overflow-hidden rounded-2xl border bg-bg-elevated/50 p-8 transition-all duration-300 hover:bg-bg-elevated ${area.border}`}
                >
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 inline-flex rounded-xl bg-white/5 p-3 text-accent">
                      {area.icon}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-bold text-text-primary sm:text-2xl">
                      {area.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 text-text-secondary leading-relaxed">
                      {area.description}
                    </p>

                    {/* Bullets */}
                    <ul className="mb-6 space-y-2">
                      {area.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-text-secondary">
                          <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Link */}
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors group-hover:text-accent-light">
                      {area.linkLabel}
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
