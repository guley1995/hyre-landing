import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { ScreenshotParallax } from "@/components/screenshot-parallax";
import { Stats } from "@/components/stats";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ScreenshotParallax />
        <Stats />
        <Pricing />
        <Testimonials locale={locale} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
