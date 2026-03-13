import type { Metadata } from "next"

import { CtaSection } from "@/components/sections/cta-section"
import { FeatureSection } from "@/components/sections/feature-section"
import { HeroSection } from "@/components/sections/hero-section"
import { PhilosophySection } from "@/components/sections/philosophy-section"
import { ProtocolSection } from "@/components/sections/protocol-section"
import { getLocaleDictionary, type LocalePageProps } from "@/lib/locale-route.server"

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleDictionary(params)

  return {
    title: dictionary.LandingMeta.title,
    description: dictionary.LandingMeta.description,
  }
}

export default async function LandingPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleDictionary(params)
  const copy = dictionary.LandingPage

  return (
    <>
      <HeroSection locale={locale} copy={copy} />

      <FeatureSection
        copy={{
          featureTitle: copy.featureTitle,
          featureIntro: copy.featureIntro,
          items: dictionary.FeatureSection.items,
        }}
      />

      <PhilosophySection locale={locale} />
      <ProtocolSection locale={locale} />
      <CtaSection locale={locale} copy={copy} />
    </>
  )
}
