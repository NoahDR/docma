import {
  Archive,
  BadgeCheck,
  CarFront,
  ClipboardList,
  FileText,
  ReceiptText,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react"

import { MotionReveal } from "@/components/motion/reveal"
import { SectionIntro } from "@/components/ui/section-intro"
import { StepChip } from "@/components/ui/step-chip"
import { SurfacePanel } from "@/components/ui/surface-panel"
import { AppLocale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type ProtocolStep = {
  title: string
  description: string
}

type ProtocolVisualCopy = {
  intakeSources: [string, string, string]
  intakeTarget: string
  reviewChecks: [string, string, string]
  reviewBadge: string
  closingOutputs: [string, string, string]
  closingBadge: string
  closingArchiveNote: string
}

type ProtocolSectionCopy = {
  title: string
  intro: string
  stepLabel: string
  steps: ProtocolStep[]
  visuals: ProtocolVisualCopy
}

const copyByLocale: Record<AppLocale, ProtocolSectionCopy> = {
  de: {
    title: "Von der Aufnahme bis zur Übergabe",
    intro: "Drei klare Schritte, damit jedes Fahrzeug sauber vom Eingang bis zur Übergabe läuft – und jeder Kunde zur Werkstatt zurückkommt.",
    stepLabel: "Schritt",
    steps: [
      {
        title: "Aufnahme & Angebot",
        description: "Kunden-, Fahrzeug- und Angebotsdaten werden in einer aktiven Deal-Timeline zusammengeführt.",
      },
      {
        title: "Deal & Vertrag",
        description: "Finanzierung, Compliance-Prüfungen und digitale Verträge laufen parallel durch den Prozess.",
      },
      {
        title: "Übergabe & Rechnung",
        description: "Rechnung, Übergabeprotokoll und Follow-up-Service werden gemeinsam ausgelöst.",
      },
    ],
    visuals: {
      intakeSources: ["Kunde", "Fahrzeug", "Angebot"],
      intakeTarget: "Deal",
      reviewChecks: ["Finanzierung", "Vertrag", "Compliance"],
      reviewBadge: "Genehmigt",
      closingOutputs: ["Rechnung", "Übergabe", "Follow-up"],
      closingBadge: "Übergeben",
      closingArchiveNote: "Sicher archiviert",
    },
  },
  en: {
    title: "Deal-to-delivery workflow",
    intro: "Three clear stages so every vehicle moves cleanly from intake to handover — and every customer comes back for service.",
    stepLabel: "Stage",
    steps: [
      {
        title: "Intake & quote",
        description: "Customer, vehicle, and quote data are merged into one active deal timeline.",
      },
      {
        title: "Deal & contract",
        description: "Financing options, compliance checks, and digital contracts run in parallel.",
      },
      {
        title: "Handover & invoice",
        description: "Invoice, vehicle handover checklist, and follow-up service are triggered together.",
      },
    ],
    visuals: {
      intakeSources: ["Customer", "Vehicle", "Quote"],
      intakeTarget: "Deal",
      reviewChecks: ["Financing", "Contract", "Compliance"],
      reviewBadge: "Approved",
      closingOutputs: ["Invoice", "Handover", "Follow-up"],
      closingBadge: "Delivered",
      closingArchiveNote: "Securely archived",
    },
  },
  it: {
    title: "Dal contatto alla consegna",
    intro: "Tre fasi chiare perché ogni veicolo si muova senza intoppi dall'ingresso alla consegna — e ogni cliente torni per il servizio.",
    stepLabel: "Fase",
    steps: [
      {
        title: "Accoglienza & preventivo",
        description: "I dati di cliente, veicolo e preventivo confluiscono in un'unica timeline di trattativa.",
      },
      {
        title: "Trattativa & contratto",
        description: "Opzioni di finanziamento, verifiche di conformità e contratti digitali procedono in parallelo.",
      },
      {
        title: "Consegna & fattura",
        description: "Fattura, checklist di consegna e servizio di follow-up vengono avviati insieme.",
      },
    ],
    visuals: {
      intakeSources: ["Cliente", "Veicolo", "Preventivo"],
      intakeTarget: "Trattativa",
      reviewChecks: ["Finanziamento", "Contratto", "Conformità"],
      reviewBadge: "Approvato",
      closingOutputs: ["Fattura", "Consegna", "Follow-up"],
      closingBadge: "Consegnato",
      closingArchiveNote: "Archiviato in sicurezza",
    },
  },
  fr: {
    title: "Du premier contact à la livraison",
    intro: "Trois étapes claires pour que chaque véhicule avance proprement de l'entrée à la remise — et que chaque client revienne pour le service.",
    stepLabel: "Étape",
    steps: [
      {
        title: "Accueil & devis",
        description: "Les données client, véhicule et devis sont réunis dans une seule timeline de transaction active.",
      },
      {
        title: "Transaction & contrat",
        description: "Options de financement, contrôles de conformité et contrats digitaux avancent en parallèle.",
      },
      {
        title: "Livraison & facture",
        description: "La facture, la checklist de remise et le suivi service sont déclenchés ensemble.",
      },
    ],
    visuals: {
      intakeSources: ["Client", "Véhicule", "Devis"],
      intakeTarget: "Transaction",
      reviewChecks: ["Financement", "Contrat", "Conformité"],
      reviewBadge: "Approuvé",
      closingOutputs: ["Facture", "Remise", "Suivi"],
      closingBadge: "Livré",
      closingArchiveNote: "Archivé en sécurité",
    },
  },
}

function MetaLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn("text-mono protocol-meta inline-flex items-center text-[10px] leading-none uppercase tracking-[0.16em]", className)}>
      {children}
    </p>
  )
}

function formatMetaFraction(value: number) {
  const paddedValue = String(value).padStart(2, "0")
  return `${paddedValue} / ${paddedValue}`
}

function VisualListItem({
  icon: Icon,
  label,
  meta,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  meta: string
}) {
  return (
    <div className="protocol-visual-panel px-3 py-2.5">
      <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-[0.95rem] border border-accent/18 bg-accent/10 text-accent">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0 grid gap-1.5">
          <MetaLabel>{meta}</MetaLabel>
          <p className="protocol-title text-sm leading-tight font-medium">{label}</p>
        </div>
      </div>
    </div>
  )
}

function VisualSummaryPanel({
  icon: Icon,
  iconClassName,
  title,
  titleClassName,
  meta,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  iconClassName?: string
  title: string
  titleClassName?: string
  meta: string
  children: React.ReactNode
}) {
  return (
    <div className="protocol-visual-panel-strong p-3.5">
      <div className="flex flex-col gap-3">
        <span
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-[0.95rem] border border-accent/18 bg-accent/10 text-accent",
            iconClassName
          )}
        >
          <Icon className="size-4.5" />
        </span>
        <div className="grid gap-1.5">
          <MetaLabel>{meta}</MetaLabel>
          <p className={cn("protocol-title text-base leading-tight font-semibold", titleClassName)}>{title}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function IntakeVisual({ copy }: { copy: ProtocolVisualCopy }) {
  const icons = [UserRoundPlus, CarFront, FileText]

  return (
    <div className="protocol-visual-shell p-3.5" aria-hidden>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_3rem_minmax(0,0.92fr)] sm:items-center">
        <div className="grid gap-2.5">
          {copy.intakeSources.map((label, index) => {
            const Icon = icons[index] ?? FileText

            return <VisualListItem key={label} icon={Icon} label={label} meta={`0${index + 1}`} />
          })}
        </div>

        <div className="hidden h-full items-center justify-center sm:flex">
          <svg viewBox="0 0 56 148" className="h-[9.25rem] w-full text-accent" fill="none">
            <path d="M2 24 H18 Q24 24 24 30 V74" stroke="currentColor" strokeWidth="2.25" strokeOpacity="0.38" />
            <path d="M2 74 H24" stroke="currentColor" strokeWidth="2.25" strokeOpacity="0.52" />
            <path d="M2 124 H18 Q24 124 24 118 V74" stroke="currentColor" strokeWidth="2.25" strokeOpacity="0.38" />
            <path d="M24 74 H52" stroke="currentColor" strokeWidth="2.25" strokeOpacity="0.84" strokeLinecap="round" />
            <circle cx="24" cy="74" r="4" fill="currentColor" fillOpacity="0.88" />
            <circle cx="50" cy="74" r="4.5" fill="currentColor" fillOpacity="0.88" className="status-dot" />
          </svg>
        </div>

        <VisualSummaryPanel icon={FileText} iconClassName="size-9" meta="03 / 03" title={copy.intakeTarget}>
          <div className="mt-4 h-1.5 rounded-full bg-accent/10">
            <div className="h-full w-[82%] rounded-full bg-accent/80" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="status-dot size-2 rounded-full bg-accent" />
            <span className="text-mono protocol-meta text-[10px] uppercase tracking-[0.14em]">
              {copy.intakeTarget}
            </span>
          </div>
        </VisualSummaryPanel>
      </div>
    </div>
  )
}

function ReviewVisual({ copy }: { copy: ProtocolVisualCopy }) {
  return (
    <div className="protocol-visual-shell p-3.5" aria-hidden>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1.08fr)_minmax(0,0.82fr)]">
        <div className="protocol-visual-panel relative overflow-hidden p-3.5">
          <span className="scan-line pointer-events-none absolute inset-x-3 top-0 h-10 bg-gradient-to-b from-transparent via-accent/12 to-transparent blur-sm" />
          <div className="flex items-center gap-2.5">
            <ClipboardList className="size-3.5 text-accent" />
            <MetaLabel className="pt-px">
              {formatMetaFraction(copy.reviewChecks.length)}
            </MetaLabel>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {copy.reviewChecks.map((label, index) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-[0.95rem] border px-2.5 py-2",
                  index === copy.reviewChecks.length - 1
                    ? "border-accent/22 bg-accent/10"
                    : "border-accent/10 bg-background/50"
                )}
              >
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-accent/18 bg-accent/10 text-accent">
                  <BadgeCheck className="size-3.5" />
                </span>
                <span className="protocol-body truncate text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <VisualSummaryPanel
          icon={ShieldCheck}
          iconClassName="size-11 rounded-[1rem]"
          meta={formatMetaFraction(copy.reviewChecks.length)}
          title={copy.reviewBadge}
          titleClassName="text-lg"
        >
          <div className="mt-4 h-1.5 rounded-full bg-accent/10">
            <div className="h-full w-full rounded-full bg-accent/82" />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="status-dot size-2 rounded-full bg-accent" />
            <span className="protocol-body truncate text-sm">{copy.reviewChecks[2]}</span>
          </div>
        </VisualSummaryPanel>
      </div>
    </div>
  )
}

function ClosingVisual({ copy }: { copy: ProtocolVisualCopy }) {
  const closingItems = [
    { icon: ReceiptText, label: copy.closingOutputs[0], meta: "01" },
    { icon: Archive, label: copy.closingOutputs[1], meta: "02" },
    { icon: ClipboardList, label: copy.closingOutputs[2], meta: "03" },
  ] as const

  return (
    <div className="protocol-visual-shell max-w-[23.5rem] p-3.5" aria-hidden>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] sm:items-stretch">
        <VisualSummaryPanel
          icon={BadgeCheck}
          meta="03 / 03"
          title={copy.closingBadge}
          titleClassName="text-[1.08rem]"
        >
          <div className="mt-4 h-1.5 rounded-full bg-accent/10">
            <div className="h-full w-full rounded-full bg-accent/82" />
          </div>
          <div className="protocol-body mt-3 flex items-center gap-2 text-sm">
            <span className="status-dot size-2 rounded-full bg-accent" />
            <span>{copy.closingArchiveNote}</span>
          </div>
        </VisualSummaryPanel>

        <div className="grid gap-2.5">
          {closingItems.map(({ icon: Icon, label, meta }) => (
            <VisualListItem key={label} icon={Icon} label={label} meta={meta} />
          ))}
        </div>
      </div>
    </div>
  )
}

const visuals = [IntakeVisual, ReviewVisual, ClosingVisual]

export function ProtocolSection({ locale }: { locale: AppLocale }) {
  const copy = copyByLocale[locale]

  return (
    <section id="protocol" className="section-space section-rule relative overflow-hidden px-4 md:px-8 color-success">
      <div className="ornament-grid" aria-hidden />
      <div className="page-shell">
        <MotionReveal variant="soft" className="max-w-[60rem]">
          <SectionIntro title={copy.title} description={copy.intro} className="max-w-[60rem]" />
        </MotionReveal>

        <div className="mt-10 space-y-4 lg:space-y-5">
          {copy.steps.map((step, index) => {
            const Visual = visuals[index] ?? IntakeVisual

            return (
              <MotionReveal
                key={step.title}
                variant={index === 1 ? "scale" : index === 0 ? "left" : "right"}
                delay={index * 50}
                duration={760}
                distance={1}
                className="relative py-1 xl:min-h-[34vh] 2xl:min-h-[38vh]"
              >
                <div className="xl:sticky xl:top-24">
                  <SurfacePanel tone="strong" padding="lg" className="protocol-card protocol-stage interactive-panel rounded-[2.2rem]">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:items-center">
                      <div>
                        <StepChip label={`${copy.stepLabel} ${index + 1}`} step={index + 1} showIndex={false} />
                        <h3 className="mt-5 font-heading text-[clamp(1.7rem,3vw,2.7rem)]">{step.title}</h3>
                        <p className="mt-4 max-w-[54ch] text-base text-muted-foreground md:text-lg">
                          {step.description}
                        </p>
                      </div>

                      <div className="protocol-visual-wrap flex justify-center xl:justify-end">
                        <Visual copy={copy.visuals} />
                      </div>
                    </div>
                  </SurfacePanel>
                </div>
              </MotionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
