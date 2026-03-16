"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export default function PlattformPage() {
  const t = useTranslations("platform");

  const features = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ({
    title: t(`features.items.${i}.title`),
    description: t(`features.items.${i}.description`),
  }));

  const featureIcons = [
    // CV Parsing
    <svg key="cv" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
    // Pipeline
    <svg key="pipeline" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>,
    // Portal
    <svg key="portal" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>,
    // Analytics
    <svg key="analytics" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
    // LinkedIn
    <svg key="linkedin" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
    // Multi-Channel
    <svg key="multichannel" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
    // GDPR
    <svg key="gdpr" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    // Job Feeds
    <svg key="feeds" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg>,
  ];

  const tiers = [0, 1, 2].map((i) => ({
    name: t(`pricing.tiers.${i}.name`),
    price: t(`pricing.tiers.${i}.price`),
    description: t(`pricing.tiers.${i}.description`),
    features: [0, 1, 2, 3, 4].map((j) => {
      try { return t(`pricing.tiers.${i}.features.${j}`); } catch { return null; }
    }).filter(Boolean),
    popular: i === 1,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-purple-950/20 to-bg-primary" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
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
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary lg:text-xl"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              {t("hero.cta")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group rounded-2xl border border-white/10 bg-bg-elevated/50 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-bg-elevated"
              >
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3 text-accent">
                  {featureIcons[i]}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
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
              {t("pricing.title")}
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              {t("pricing.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 lg:grid-cols-3"
          >
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className={`relative overflow-hidden rounded-2xl border p-8 ${
                  tier.popular
                    ? "border-accent/50 bg-bg-elevated"
                    : "border-white/10 bg-bg-elevated/50"
                }`}
              >
                {tier.popular && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-purple-500" />
                )}
                <h3 className="text-xl font-bold text-text-primary">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-text-primary">{tier.price}</span>
                  <span className="text-text-secondary">/mo</span>
                </div>
                <p className="mt-3 text-sm text-text-secondary">{tier.description}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-text-secondary">
                      <svg className="h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/kontakt"
                  className={`mt-8 block rounded-xl px-6 py-3 text-center text-sm font-medium transition-all ${
                    tier.popular
                      ? "bg-accent text-white hover:bg-accent-light"
                      : "border border-white/10 text-text-primary hover:bg-white/5"
                  }`}
                >
                  {t("pricing.cta")}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 text-center text-sm text-text-muted"
          >
            {t("pricing.note")}
          </motion.p>
        </div>
      </section>
    </div>
  );
}
