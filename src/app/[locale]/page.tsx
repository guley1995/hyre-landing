import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { ScreenshotParallax } from "@/components/screenshot-parallax";
import { Pricing } from "@/components/pricing";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ScreenshotParallax />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
