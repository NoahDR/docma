import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"

import { MotionReveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { SurfacePanel } from "@/components/ui/surface-panel"
import { SectionIntro } from "@/components/ui/section-intro"
import { AppLocale, LandingPageCopy } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type FinalCopy = Pick<
  LandingPageCopy,
  "finalTitle" | "finalDescription" | "finalCta" | "promise1" | "promise2" | "promise3" | "helpText"
>

const priceByLocale: Record<AppLocale, { labels: [string, string, string]; units: [string, string, string] }> = {
  de: {
    labels: ["Free", "Autohaus", "Enterprise"],
    units: ["0€", "79€ / Monat", "Individuell"],
  },
  en: {
    labels: ["Free", "Dealership", "Enterprise"],
    units: ["€0", "€79 / month", "Custom"],
  },
  it: {
    labels: ["Free", "Concessionaria", "Enterprise"],
    units: ["0€", "79€ / mese", "Su misura"],
  },
  fr: {
    labels: ["Free", "Concession", "Enterprise"],
    units: ["0€", "79€ / mois", "Sur devis"],
  },
}

const pricingToneClasses = [
  "",
  "color-highlight",
  "color-success",
] as const

export function CtaSection({ locale, copy }: { locale: AppLocale; copy: FinalCopy }) {
  const pricing = priceByLocale[locale]
  const sharedFeatures = [copy.promise1, copy.promise2, copy.promise3]
  const plans = pricing.labels.map((label, index) => ({
    id: label.toLowerCase(),
    label,
    unit: pricing.units[index],
    isMiddle: index === 1,
  }))

  return (
    <section id="pricing" className="section-space section-rule px-4 md:px-8">
      <div className="page-shell">
        <MotionReveal variant="soft" className="max-w-[66rem]">
          <SectionIntro
            title={copy.finalTitle}
            description={copy.finalDescription}
            className="max-w-[66rem]"
          />
        </MotionReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:items-stretch">
          {plans.map((plan, index) => (
            <MotionReveal
              key={plan.id}
              delay={index * 80}
              duration={680}
              variant={plan.isMiddle ? "scale" : "up"}
              className={cn("h-full", index === plans.length - 1 && "md:col-span-2 xl:col-span-1")}
            >
              <SurfacePanel
                tone={plan.isMiddle ? "strong" : "soft"}
                padding="lg"
                className={cn("interactive-panel pricing-card h-full", pricingToneClasses[index])}
              >
                <div className="flex h-full flex-col gap-6">
                  <div className="min-h-[8.5rem]">
                    <p className="text-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">{plan.label}</p>
                    <h3 className="mt-3 font-heading text-[clamp(2.2rem,4vw,3.25rem)] tracking-[-0.05em] text-foreground">
                      {plan.unit}
                    </h3>
                    <p className="mt-3 max-w-[30ch] text-sm text-muted-foreground">{copy.helpText}</p>
                  </div>

                  <ul className="flex flex-1 flex-col gap-3">
                    {sharedFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-foreground/90">
                        <span className="pricing-check-badge inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <Check className="size-3.5" aria-hidden />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.isMiddle ? "secondary" : "outline"}
                    size="lg"
                    className="w-full justify-center"
                    asChild
                  >
                    <Link href={`/${locale}/register`}>
                      {copy.finalCta}
                      <ArrowUpRight data-icon="inline-end" aria-hidden />
                    </Link>
                  </Button>
                </div>
              </SurfacePanel>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
