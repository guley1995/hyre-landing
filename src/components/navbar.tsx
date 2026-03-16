"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 150);
    setScrolled(latest > 50);
  });

  const currentLocale = useLocale();
  const targetLocale = currentLocale === "de" ? "en" : "de";

  function switchLocale() {
    router.push(pathname as any, { locale: targetLocale });
  }

  const links = [
    { href: "/dienstleistungen" as const, label: t("services") },
    { href: "/acquire" as const, label: t("acquire") },
    { href: "/plattform" as const, label: t("platform") },
    { href: "/ueber-uns" as const, label: t("about") },
    { href: "/kontakt" as const, label: t("contact") },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 z-50 w-full transition-colors duration-300",
          scrolled ? "glass-strong" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight text-text-primary">
            HYRE<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-text-primary",
                  pathname === link.href
                    ? "text-accent font-medium"
                    : "text-text-secondary",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={switchLocale}
              className="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
            >
              {t("language")}
            </button>
            <Link
              href="/kontakt"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-text-primary"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass-strong fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-2xl font-medium transition-colors hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-text-primary",
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                switchLocale();
                setMobileOpen(false);
              }}
              className="text-lg text-text-secondary hover:text-text-primary"
            >
              {t("language")}
            </button>
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl bg-accent px-8 py-3 text-lg font-medium text-white"
            >
              {t("cta")}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
