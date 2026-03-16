import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/dienstleistungen": {
      de: "/dienstleistungen",
      en: "/services",
    },
    "/acquire": "/acquire",
    "/plattform": {
      de: "/plattform",
      en: "/platform",
    },
    "/ueber-uns": {
      de: "/ueber-uns",
      en: "/about-us",
    },
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
    },
    "/impressum": {
      de: "/impressum",
      en: "/imprint",
    },
    "/datenschutz": {
      de: "/datenschutz",
      en: "/privacy",
    },
    "/agb": {
      de: "/agb",
      en: "/terms",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
