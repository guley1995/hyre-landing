"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function AcquirePage() {
  const t = useTranslations("acquire");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const steps = [0, 1, 2, 3].map((i) => ({
    num: t(`workflow.steps.${i}.num`),
    title: t(`workflow.steps.${i}.title`),
    description: t(`workflow.steps.${i}.description`),
  }));

  const benefits = [0, 1, 2, 3, 4, 5].map((i) => t(`benefits.items.${i}`));

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-indigo-950/20 to-bg-primary" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t("hero.badge")}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-7xl"
          >
            {t("hero.title1")}
            <br />
            <span className="gradient-text">{t("hero.title2")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-text-secondary lg:text-xl"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              {t("hero.cta")}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              {t("workflow.subtitle")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t("workflow.title")}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={staggerItem}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-bg-elevated/50 p-6">
                  <span className="mb-4 block text-4xl font-bold text-accent/30">
                    {step.num}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                  {/* Connector line */}
                  {i < 3 && (
                    <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-accent/30 lg:block" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-accent/30 bg-bg-elevated/50"
          >
            <div className="bg-gradient-to-r from-accent/20 to-purple-500/20 p-8 lg:p-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                    {t("pricing.subtitle")}
                  </p>
                  <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                    {t("pricing.title")}
                  </h2>
                  <p className="mt-4 max-w-lg text-text-secondary">
                    {t("pricing.description")}
                  </p>
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-5xl font-bold text-text-primary lg:text-6xl">
                    {t("pricing.price")}
                  </div>
                  <p className="mt-1 text-text-secondary">{t("pricing.per")}</p>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              <h3 className="mb-6 text-lg font-semibold text-text-primary">
                {t("benefits.title")}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg className="h-5 w-5 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pilot CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/5 to-bg-primary" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              {t("pilot.title")}
            </h2>
            <p className="mt-6 text-lg text-text-secondary">
              {t("pilot.description")}
            </p>
            <Link
              href="/kontakt"
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              {t("pilot.cta")}
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
