"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ImpressumPage() {
  const t = useTranslations("legal");

  return (
    <div className="relative pt-28 pb-24 lg:pt-36 lg:pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/20 to-bg-primary" />
      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-12 text-4xl font-bold text-text-primary">{t("imprint.title")}</h1>
          <div className="mb-10 rounded-xl border border-accent/20 bg-accent/5 p-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{t("imprint.notice_title")}</h2>
            <p className="text-text-secondary leading-relaxed">{t("imprint.notice_text")}</p>
          </div>
          <div className="prose-dark space-y-8 text-text-secondary">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">{t("imprint.company_info")}</h2>
              <p className="whitespace-pre-line leading-relaxed">{t("imprint.company_details")}</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">{t("imprint.represented_by")}</h2>
              <p>{t("imprint.representative")}</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">{t("imprint.contact_title")}</h2>
              <p className="whitespace-pre-line leading-relaxed">{t("imprint.contact_details")}</p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">{t("imprint.disclaimer_title")}</h2>
              <p className="leading-relaxed">{t("imprint.disclaimer_text")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
