import { MotionReveal } from "@/components/motion/reveal"
import { AuthForm } from "@/components/forms/auth-form"
import { TrustIndicators } from "@/components/sections/trust-indicators"
import { HomeCtaButton } from "@/components/ui/home-cta-button"
import { SurfacePanel } from "@/components/ui/surface-panel"
import { AppLocale, LoginPageCopy, RegisterPageCopy } from "@/lib/i18n"

type AuthSectionProps =
  | {
      locale: AppLocale
      mode: "login"
      copy: LoginPageCopy
    }
  | {
      locale: AppLocale
      mode: "register"
      copy: RegisterPageCopy
    }

function getTrustItems(copy: LoginPageCopy | RegisterPageCopy) {
  return [copy.trust.transport, copy.trust.hosting, copy.trust.access].map((label) => ({ label }))
}

export function AuthSection({ locale, mode, copy }: AuthSectionProps) {
  const trustItems = getTrustItems(copy)

  return (
    <section className="relative isolate box-border overflow-hidden px-4 pb-10 pt-24 md:px-8 md:pb-12 md:pt-28 lg:flex lg:min-h-dvh lg:items-center lg:py-8">
      <div className="ornament-grid" aria-hidden />
      <div className="ornament-glow ambient-float left-[8%] top-[12%] h-44 w-44" aria-hidden />
      <div className="ornament-glow ambient-float right-[8%] top-[18%] h-60 w-60 opacity-75" aria-hidden />

      <div className="page-shell w-full">
        <div className="mb-5 xl:hidden">
          <HomeCtaButton locale={locale} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(19rem,32rem)] xl:items-center xl:gap-8">
          <MotionReveal variant="right" duration={760} className="order-1 xl:order-2">
            <SurfacePanel tone="strong" padding="md" className="interactive-panel rounded-[2.25rem]">
              <div className="mx-auto w-full max-w-[30rem]">
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
                  {copy.formTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.formDescription}</p>

                <div className="mt-5">
                  {mode === "login" ? (
                    <AuthForm locale={locale} mode="login" labels={copy.form} />
                  ) : (
                    <AuthForm locale={locale} mode="register" labels={copy.form} />
                  )}
                </div>
              </div>
            </SurfacePanel>
          </MotionReveal>

          <MotionReveal variant="left" delay={90} duration={700} className="order-2 xl:order-1">
            <SurfacePanel tone="quiet" padding="md" className="rounded-[2.25rem]">
              <div className="max-w-[56ch]">
                <h2 className="max-w-[14ch]">{copy.title}</h2>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">{copy.description}</p>
                <TrustIndicators items={trustItems} className="mt-6 color-success" />
                <div className="mt-8 hidden xl:flex">
                  <HomeCtaButton locale={locale} />
                </div>
              </div>
            </SurfacePanel>
          </MotionReveal>
        </div>
      </div>
    </section>
  )
}
