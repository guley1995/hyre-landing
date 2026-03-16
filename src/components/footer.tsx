"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const targetLocale = currentLocale === "de" ? "en" : "de";

  function switchLocale() {
    router.push(pathname as any, { locale: targetLocale });
  }

  const columns = [
    {
      title: t("services_title"),
      links: [
        { label: t("services_all"), href: "/dienstleistungen" as const },
        { label: t("acquire"), href: "/acquire" as const },
        { label: t("platform"), href: "/plattform" as const },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: t("about"), href: "/ueber-uns" as const },
        { label: t("contact"), href: "/kontakt" as const },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("privacy"), href: "/datenschutz" as const },
        { label: t("terms"), href: "/agb" as const },
        { label: t("imprint"), href: "/impressum" as const },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#050505] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-text-primary">
              HYRE<span className="text-accent">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              {t("tagline")}
            </p>
            <p className="mt-4 text-sm text-text-muted">
              {t("email_label")}: <a href="mailto:info@huehyre.de" className="text-text-secondary hover:text-accent transition-colors">info@huehyre.de</a>
            </p>
            {/* Socials */}
            <div className="mt-6 flex gap-4">
              {[
                <svg key="li" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
              ].map((icon) => (
                <a
                  key={icon.key}
                  href="https://linkedin.com/company/hyre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted transition-colors hover:text-text-primary"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-text-primary">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-text-secondary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} HYRE. {t("copyright")}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://consulting.huehyre.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-text-secondary"
            >
              HYRE Consulting
            </a>
            <button
              onClick={switchLocale}
              className="rounded-lg px-3 py-1.5 text-sm text-text-muted transition-colors hover:bg-white/5 hover:text-text-secondary"
            >
              {currentLocale === "de" ? "English" : "Deutsch"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
