"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function UeberUnsPage() {
  const t = useTranslations("about");

  const pillars = [0, 1, 2].map((i) => ({
    title: t(`pillars.items.${i}.title`),
    description: t(`pillars.items.${i}.description`),
    label: t(`pillars.items.${i}.label`),
  }));

  const values = [0, 1, 2, 3].map((i) => ({
    title: t(`values.items.${i}.title`),
    description: t(`values.items.${i}.description`),
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-4xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-text-secondary lg:text-xl leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t("story.title")}
            </h2>
            <div className="mt-8 space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t("pillars.title")}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">{t("pillars.subtitle")}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-bg-elevated/50 p-8 transition-all hover:border-accent/30"
              >
                <span className="mb-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {pillar.label}
                </span>
                <h3 className="mb-3 text-xl font-bold text-text-primary">{pillar.title}</h3>
                <p className="text-text-secondary leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t("values.title")}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {values.map((value, i) => (
              <motion.div key={i} variants={staggerItem} className="border-l-2 border-accent/30 pl-6 py-2">
                <h3 className="text-lg font-semibold text-text-primary">{value.title}</h3>
                <p className="mt-2 text-text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/5 to-bg-primary" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mt-6 text-lg text-text-secondary">{t("cta.description")}</p>
            <Link
              href="/kontakt"
              className="mt-10 inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              {t("cta.button")}
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
