import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { ScreenshotParallax } from "@/components/screenshot-parallax";
import { ServiceAreas } from "@/components/service-areas";
import { Pricing } from "@/components/pricing";
import { CTA } from "@/components/cta";

export default async function Home() {
  return (
    <>
      <Hero />
      <ServiceAreas />
      <Features />
      <ScreenshotParallax />
      <Pricing />
      <CTA />
    </>
  );
}
