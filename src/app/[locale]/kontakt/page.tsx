"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeInUp } from "@/lib/animations";

export default function KontaktPage() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState("sent");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" />
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary lg:text-xl"
          >
            {t("hero.description")}
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="relative pb-24 lg:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-white/10 bg-bg-elevated/50 p-8 lg:p-10">
                {formState === "sent" ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                      <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-text-primary">{t("form.success.title")}</h3>
                    <p className="mt-4 text-text-secondary">{t("form.success.description")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-text-primary">
                          {t("form.name")} *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent"
                          placeholder={t("form.name_placeholder")}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-text-primary">
                          {t("form.email")} *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent"
                          placeholder={t("form.email_placeholder")}
                        />
                      </div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="mb-2 block text-sm font-medium text-text-primary">
                          {t("form.company")}
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent"
                          placeholder={t("form.company_placeholder")}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-text-primary">
                          {t("form.phone")}
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent"
                          placeholder={t("form.phone_placeholder")}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-text-primary">
                        {t("form.message")} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full rounded-xl border border-white/10 bg-bg-primary px-4 py-3 text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent resize-none"
                        placeholder={t("form.message_placeholder")}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="w-full rounded-xl bg-accent px-8 py-4 text-base font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
                    >
                      {formState === "sending" ? t("form.sending") : t("form.submit")}
                    </button>
                    {formState === "error" && (
                      <p className="text-center text-sm text-red-400">{t("form.error")}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-text-primary">{t("info.title")}</h3>
                  <p className="text-text-secondary leading-relaxed">{t("info.description")}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{t("info.email")}</p>
                      <a href="mailto:info@huehyre.de" className="text-text-primary hover:text-accent transition-colors">
                        info@huehyre.de
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-text-muted">{t("info.location")}</p>
                      <p className="text-text-primary">Wertingen, Deutschland</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                  <h4 className="mb-2 font-semibold text-text-primary">{t("info.cta_title")}</h4>
                  <p className="text-sm text-text-secondary">{t("info.cta_description")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
