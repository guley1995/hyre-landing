import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "HYRE — Recruiting-Technologie für Personaldienstleister",
    template: "%s | HYRE",
  },
  description:
    "HYRE bietet KI-gestützte Recruiting-Lösungen für Personaldienstleister und Zeitarbeitsfirmen. Acquire, Automatisierung und SaaS-Plattform.",
  openGraph: {
    title: "HYRE — Recruiting-Technologie für Personaldienstleister",
    description:
      "KI-gestützte Recruiting-Lösungen: Acquire, Automatisierung und SaaS-Plattform für PDL.",
    type: "website",
    url: "https://huehyre.de",
    siteName: "HYRE",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg-primary font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
