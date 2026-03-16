"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function DatenschutzPage() {
  const t = useTranslations("legal");

  const sections = [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`privacy.sections.${i}.title`),
    content: t(`privacy.sections.${i}.content`),
  }));

  return (
    <div className="relative pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/20 to-bg-primary" />
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-12 text-4xl font-bold text-text-primary">{t("privacy.title")}</h1>
          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                <h2 className="mb-3 text-lg font-semibold text-text-primary">{section.title}</h2>
                <p className="whitespace-pre-line text-text-secondary leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
