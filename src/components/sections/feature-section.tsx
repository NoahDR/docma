import {
  CarFront,
  Cloud,
  FileText,
  Megaphone,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
} from "lucide-react"

import { MotionReveal } from "@/components/motion/reveal"
import { SurfacePanel } from "@/components/ui/surface-panel"
import { SectionIntro } from "@/components/ui/section-intro"
import { FeatureItems, LandingPageCopy } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type FeatureSectionCopy = Pick<LandingPageCopy, "featureTitle" | "featureIntro"> & {
  items: FeatureItems
}

const featureIcons = [
  Cloud,
  UserRoundPlus,
  FileText,
  ShieldCheck,
  Megaphone,
  Sparkles,
] as const

const featureToneClasses = [
  "",
  "",
  "color-highlight",
  "color-success",
  "color-highlight",
  "color-success",
] as const

export function FeatureSection({ copy }: { copy: FeatureSectionCopy }) {
  const items = copy.items.slice(0, 6)

  return (
    <section id="features" className="section-space section-rule px-4 md:px-8">
      <div className="page-shell">
        <MotionReveal variant="soft" className="max-w-[68rem]">
          <SectionIntro
            title={copy.featureTitle}
            description={copy.featureIntro}
            className="max-w-[68rem]"
          />
        </MotionReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = featureIcons[index] ?? CarFront

            return (
              <MotionReveal
                key={item.title}
                delay={index * 70}
                duration={640}
                distance={0.9}
                className="h-full"
              >
                <SurfacePanel
                  tone="soft"
                  padding="lg"
                  className={cn(
                    "interactive-panel feature-card h-full min-h-[16rem] sm:min-h-[17rem] xl:min-h-[18.5rem]",
                    featureToneClasses[index]
                  )}
                >
                  <div className="grid h-full grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-5">
                    <span className="feature-icon-shell inline-flex size-12 shrink-0 self-center justify-self-center items-center justify-center rounded-[1rem] border border-accent/14 bg-accent/8 text-accent">
                      <Icon className="size-[1.15rem]" aria-hidden />
                    </span>
                    <h3 className="type-title-sm self-center text-foreground">{item.title}</h3>

                    <ul className="col-span-2 grid gap-3.5" aria-label={item.title}>
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="grid grid-cols-[3rem_minmax(0,1fr)] items-start gap-x-4">
                          <span className="flex h-[1.55rem] items-center justify-center" aria-hidden>
                            <span className="feature-bullet size-1.5 rounded-full bg-accent/45" />
                          </span>
                          <p className="text-[0.95rem] leading-[1.55] text-muted-foreground">{bullet}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SurfacePanel>
              </MotionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
