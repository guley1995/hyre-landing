"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function UeberUnsPage() {
  const t = useTranslations("about");

  const values = [0, 1, 2].map((i) => ({
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
            {t("hero.titleLine1")}
            <br />
            {t("hero.titleLine2")}
            <br />
            <span className="bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
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
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-8">
              {t("story.subtitle")}
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-text-primary leading-snug tracking-tight">
              {t("story.title")}
            </p>
            <div className="mt-8 space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>{t("story.paragraphs.0")}</p>
              <p>{t("story.paragraphs.1")}</p>
              <p>{t("story.paragraphs.2")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-6">
              {t("values.subtitle")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl mb-16">
              {t("values.title")}{" "}
              <span className="text-text-muted">{t("values.titleMuted")}</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="divide-y divide-white/10"
          >
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-16 py-10 lg:py-14"
              >
                <div className="shrink-0 lg:w-72">
                  <h3 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
                    {value.title}
                  </h3>
                </div>
                <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ATS Section */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-8">
              {t("ats.subtitle")}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {t("ats.title")}
            </h2>
            <div className="mt-8 space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>{t("ats.paragraphs.0")}</p>
              <p>{t("ats.paragraphs.1")}</p>
            </div>
            <div className="mt-10">
              <Link
                href="/plattform"
                className="inline-flex items-center gap-2 text-accent font-bold text-lg hover:text-accent-light transition-colors"
              >
                {t("ats.linkText")}
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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
              {t("cta.titleLine1")}
              <br />
              <span className="text-text-muted">{t("cta.titleMuted")}</span>
            </h2>
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
