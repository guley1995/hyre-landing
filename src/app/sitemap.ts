import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://huehyre.de";

  const routes = [
    {
      de: "/",
      en: "/en",
      priority: 1.0,
      changeFrequency: "weekly" as const,
    },
    {
      de: "/dienstleistungen",
      en: "/en/services",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      de: "/acquire",
      en: "/en/acquire",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      de: "/plattform",
      en: "/en/platform",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      de: "/ueber-uns",
      en: "/en/about-us",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    {
      de: "/kontakt",
      en: "/en/contact",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      de: "/impressum",
      en: "/en/imprint",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      de: "/datenschutz",
      en: "/en/privacy",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      de: "/agb",
      en: "/en/terms",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];

  return routes.flatMap((route) => [
    {
      url: `${baseUrl}${route.de}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          de: `${baseUrl}${route.de}`,
          en: `${baseUrl}${route.en}`,
        },
      },
    },
    {
      url: `${baseUrl}${route.en}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          de: `${baseUrl}${route.de}`,
          en: `${baseUrl}${route.en}`,
        },
      },
    },
  ]);
}
