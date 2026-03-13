import Link from "next/link"
import { ArrowUpRight, LockKeyhole, ServerCog, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { InfoStack } from "@/components/ui/info-stack"
import { AppLocale, LandingPageCopy } from "@/lib/i18n"

type HeroCopy = Pick<
  LandingPageCopy,
  "headlineLine1" | "headlineLine2" | "description" | "primaryCta" | "secondaryCta" | "trust"
>

export function HeroSection({ locale, copy }: { locale: AppLocale; copy: HeroCopy }) {
  const trustItems = [
    { label: copy.trust.ssl, icon: LockKeyhole },
    { label: copy.trust.hosting, icon: ServerCog },
    { label: copy.trust.privacy, icon: ShieldCheck },
  ] as const

  return (
    <section
      id="hero-section"
      className="relative isolate flex items-center overflow-hidden px-4 pb-8 pt-24 sm:pt-28 md:min-h-[100dvh] md:items-end md:px-8 md:pb-12 md:pt-32"
    >
      <div className="ornament-grid" aria-hidden />
      <div className="ornament-glow ambient-float left-[8%] top-[10%] h-48 w-48" aria-hidden />
      <div className="ornament-glow ambient-float right-[6%] top-[14%] h-56 w-56 opacity-80" aria-hidden />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-[var(--ornament-strong)]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <circle cx="90" cy="2" r="28" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.7" />
        <circle cx="90" cy="2" r="19" fill="none" stroke="currentColor" strokeWidth="0.16" opacity="0.48" />
        <path d="M0 82 C18 78 35 78 52 82" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.32" />
        <path d="M48 100 V74" fill="none" stroke="currentColor" strokeWidth="0.16" opacity="0.2" />
      </svg>

      <div className="page-shell relative">
        <div className="surface-panel surface-panel-hero reveal-enter color-highlight px-5 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)] lg:items-end lg:gap-10">
            <div className="reveal-enter reveal-delay-1 max-w-[44rem]">
              <h1
                className="max-w-[13ch] text-foreground"
                aria-label={`${copy.headlineLine1} ${copy.headlineLine2}`}
              >
                <span className="type-display-md block">{copy.headlineLine1}</span>
                <span className="text-serif type-display-lg mt-2 block italic text-accent">
                  {copy.headlineLine2}
                </span>
              </h1>

              <p className="type-lead mt-6 max-w-[56ch] text-muted-foreground">
                {copy.description}
              </p>

              <div className="reveal-enter-soft reveal-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                <Button size="lg" variant="secondary" asChild>
                  <Link href={`/${locale}/register`}>
                    {copy.primaryCta}
                    <ArrowUpRight data-icon="inline-end" aria-hidden />
                  </Link>
                </Button>

                <Button size="lg" variant="outline" asChild>
                  <Link href={`/${locale}/#features`}>{copy.secondaryCta}</Link>
                </Button>
              </div>
            </div>

            <div className="surface-panel surface-panel-inset interactive-panel reveal-enter-soft reveal-delay-3 color-success p-4 sm:p-5 md:p-6">
              <InfoStack items={trustItems} className="gap-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
