"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

export default function DienstleistungenPage() {
  const t = useTranslations("services");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const services = [
    {
      category: t("categories.acquire.title"),
      description: t("categories.acquire.description"),
      href: "/acquire" as const,
      color: "from-indigo-500 to-purple-600",
      borderColor: "border-indigo-500/30",
      items: [0, 1].map((i) => ({
        title: t(`categories.acquire.items.${i}.title`),
        desc: t(`categories.acquire.items.${i}.description`),
      })),
    },
    {
      category: t("categories.automation.title"),
      description: t("categories.automation.description"),
      href: "/dienstleistungen" as const,
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-500/30",
      items: [0, 1, 2].map((i) => ({
        title: t(`categories.automation.items.${i}.title`),
        desc: t(`categories.automation.items.${i}.description`),
      })),
    },
    {
      category: t("categories.platform.title"),
      description: t("categories.platform.description"),
      href: "/plattform" as const,
      color: "from-purple-500 to-pink-600",
      borderColor: "border-purple-500/30",
      items: [0, 1, 2, 3].map((i) => ({
        title: t(`categories.platform.items.${i}.title`),
        desc: t(`categories.platform.items.${i}.description`),
      })),
    },
    {
      category: t("categories.compliance.title"),
      description: t("categories.compliance.description"),
      href: "/dienstleistungen" as const,
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500/30",
      items: [0, 1, 2].map((i) => ({
        title: t(`categories.compliance.items.${i}.title`),
        desc: t(`categories.compliance.items.${i}.description`),
      })),
    },
  ];

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary lg:text-xl"
          >
            {t("hero.description")}
          </motion.p>
        </div>
      </section>

      {/* Service Categories */}
      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-16"
          >
            {services.map((service, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <div className={`overflow-hidden rounded-2xl border ${service.borderColor} bg-bg-elevated/30`}>
                  {/* Category header */}
                  <div className="border-b border-white/5 p-8 lg:p-10">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
                          {service.category}
                        </h2>
                        <p className="mt-2 max-w-xl text-text-secondary">
                          {service.description}
                        </p>
                      </div>
                      <Link
                        href={service.href}
                        className={`inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r ${service.color} px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg`}
                      >
                        {t("learnMore")}
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Service items */}
                  <div className="grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-3">
                    {service.items.map((item, i) => (
                      <div key={i} className="bg-bg-primary/80 p-6 lg:p-8">
                        <h3 className="mb-2 text-lg font-semibold text-text-primary">
                          {item.title}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent/5 to-bg-primary" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            {t("cta.title")}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-6 text-lg text-text-secondary"
          >
            {t("cta.description")}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-10"
          >
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-lg font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
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
