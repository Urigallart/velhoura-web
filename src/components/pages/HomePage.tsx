import { Hero } from "@/components/sections/Hero";
import { IntroZoom } from "@/components/intro/IntroZoom";
import { WorkSection } from "@/components/sections/WorkSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NfcSection } from "@/components/sections/NfcSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { GlobeSection } from "@/components/sections/GlobeSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { DifferentiationSection } from "@/components/sections/DifferentiationSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Locale } from "@/i18n/locale";

/**
 * The home page, in either language. `/` and `/en` both render this; the
 * only difference is the `locale` handed down.
 *
 * The order follows the questions a business owner asks, in the order they
 * ask them: show me real work → what do you do → what does it look like → what does it
 * cost → how does it work → with what → (the pause) → why not someone else → who are you → who else trusts you → what about…
 * → how do I start.
 *
 * `ProofSection` renders nothing until `data/proof.ts` holds real clients,
 * results or reviews.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <IntroZoom
        hero={<Hero locale={locale} />}
        screen={<Hero locale={locale} interactive={false} />}
        desk={`/intro/screen-${locale}.webp`}
      />
      <ToolsSection locale={locale} />
      <GlobeSection />
      <WorkSection />
      <ServicesSection locale={locale} />
      <NfcSection locale={locale} />
      <ShowcaseSection />
      <PricingSection locale={locale} />
      <WhySection locale={locale} />
      <ProcessSection locale={locale} />
      <VisionSection locale={locale} />
      <DifferentiationSection locale={locale} />
      <AboutSection locale={locale} />
      <ProofSection locale={locale} />
      <FaqSection locale={locale} />
      <ContactSection />
    </>
  );
}
