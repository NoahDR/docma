"use client"

import { usePathname } from "next/navigation"
import { AlertTriangle, Compass, Radar, ShieldCheck } from "lucide-react"

import { HomeCtaButton } from "@/components/ui/home-cta-button"
import { SurfacePanel } from "@/components/ui/surface-panel"
import { AppLocale, isAppLocale } from "@/lib/i18n"
import { getNotFoundCopy } from "@/lib/not-found-copy"

type NotFoundScreenProps = Readonly<{
  locale?: AppLocale
  navigationMode?: "client" | "document"
}>

export function NotFoundScreen({ locale: localeProp, navigationMode = "client" }: NotFoundScreenProps) {
  const pathname = usePathname()
  const localeCandidate = pathname.split("/").filter(Boolean)[0]
  const locale = localeProp ?? (isAppLocale(localeCandidate) ? localeCandidate : "de")
  const copy = getNotFoundCopy(locale)
  const diagnostics = [
    {
      icon: Radar,
      ...copy.items.routeMissing,
    },
    {
      icon: Compass,
      ...copy.items.checkUrl,
    },
    {
      icon: AlertTriangle,
      ...copy.items.contentMoved,
    },
    {
      icon: ShieldCheck,
      ...copy.items.nextStep,
    },
  ] as const
  return (
    <section className="relative isolate min-h-dvh overflow-hidden px-4 pb-10 pt-24 md:px-8 md:pb-14 md:pt-30">
      <div className="ornament-grid" aria-hidden />
      <div className="ornament-glow left-[8%] top-[12%] h-44 w-44" aria-hidden />
      <div className="ornament-glow right-[8%] top-[18%] h-60 w-60 opacity-80" aria-hidden />

      <div className="page-shell">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)]">
          <SurfacePanel tone="hero" padding="lg" className="reveal-enter color-highlight">
            <div className="max-w-[46rem]">
              <p className="type-eyebrow text-accent">{copy.eyebrow}</p>

              <h1
                className="mt-5 max-w-[11ch] text-foreground"
                aria-label={`${copy.headlineLine1} ${copy.headlineLine2}`}
              >
                <span className="block font-heading text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.92] tracking-[-0.05em]">
                  {copy.headlineLine1}
                </span>
                <span className="text-serif mt-2 block text-[clamp(3rem,8vw,6.2rem)] leading-[0.82] italic tracking-[-0.03em] text-accent">
                  {copy.headlineLine2}
                </span>
              </h1>

              <p className="mt-6 max-w-[56ch] text-base text-muted-foreground md:text-lg">
                {copy.description}
              </p>

              <div className="mt-8">
                <HomeCtaButton locale={locale} navigationMode={navigationMode} />
              </div>
            </div>
          </SurfacePanel>

          <SurfacePanel tone="strong" padding="lg" className="reveal-enter-soft reveal-delay-1 color-success">
            <p className="type-eyebrow text-muted-foreground">{copy.diagnosticsEyebrow}</p>
            <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em] text-foreground">
              {copy.diagnosticsTitle}
            </h2>
            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
              {copy.diagnosticsDescription}
            </p>

            <div className="mt-6 grid gap-3">
              {diagnostics.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="surface-panel surface-panel-inset rounded-[1.4rem] p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[1rem] border border-accent/18 bg-accent/10 text-accent">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SurfacePanel>
        </div>
      </div>
    </section>
  )
}
