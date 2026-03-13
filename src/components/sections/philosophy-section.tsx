import { AppLocale } from "@/lib/i18n"
import { MotionReveal } from "@/components/motion/reveal"

type PhilosophyCopy = {
  contrast: string
  line1: string
  line2: string
  accent: string
}

const philosophyCopy: Record<AppLocale, PhilosophyCopy> = {
  de: {
    contrast: "Kein Springen zwischen mehreren Programmen.",
    line1: "Wir priorisieren:",
    line2: "einen einzigen, klaren Flow für Verkauf, Organisation und Abrechnung.",
    accent: "klaren Flow",
  },
  en: {
    contrast: "No jumping between multiple tools.",
    line1: "We optimize for:",
    line2: "one clear operating flow across sales, operations, and billing.",
    accent: "clear operating flow",
  },
  it: {
    contrast: "Nessun salto tra più programmi.",
    line1: "Noi ottimizziamo per:",
    line2: "un unico flusso operativo tra vendita, organizzazione e fatturazione.",
    accent: "unico flusso operativo",
  },
  fr: {
    contrast: "Aucun va-et-vient entre plusieurs outils.",
    line1: "Nous optimisons pour:",
    line2: "un flux opérationnel unique entre vente, organisation et facturation.",
    accent: "flux opérationnel unique",
  },
}

export function PhilosophySection({ locale }: { locale: AppLocale }) {
  const copy = philosophyCopy[locale]
  const [prefix, suffix] = copy.line2.split(copy.accent)

  return (
    <section className="section-rule relative overflow-hidden px-4 py-16 md:px-8 md:py-20">
      <div className="ornament-grid" aria-hidden />
      <div className="page-shell">
        <MotionReveal variant="scale" duration={760}>
          <div className="surface-panel surface-panel-quiet rounded-[2.2rem] color-highlight px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-[64rem] text-center">
              <p
                className="text-sm font-medium tracking-[-0.02em] text-muted-foreground md:text-base"
              >
                {copy.contrast}
              </p>

              <h2
                className="mt-5 font-heading text-[clamp(2.2rem,5.4vw,4.9rem)] leading-[0.92] tracking-[-0.055em] text-foreground"
                aria-label={`${copy.line1} ${copy.line2}`}
              >
                <span className="block text-[0.5em] font-medium tracking-[-0.035em] text-muted-foreground">
                  {copy.line1}
                </span>
                <span className="mt-4 block">
                  {prefix}
                  <span className="text-serif italic text-accent">{copy.accent}</span>
                  {suffix}
                </span>
              </h2>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}
