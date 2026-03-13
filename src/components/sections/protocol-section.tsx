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
    title: "Verkaufsablauf",
    intro: "Drei klare Schritte, damit jeder Verkauf sauber, nachvollziehbar und ohne Medienbruch durchläuft.",
    stepLabel: "Schritt",
    steps: [
      {
        title: "Kunde aufnehmen",
        description: "Kunden-, Fahrzeug- und Angebotsdaten werden einfach zusammengeführt.",
      },
      {
        title: "Verkauf prüfen",
        description: "Verträge, Checklisten und Pflichtangaben werden sauber geprüft.",
      },
      {
        title: "Verkauf abschließen",
        description: "Rechnung, Archiv und Folgeaufgaben werden automatisch gestartet.",
      },
    ],
    visuals: {
      intakeSources: ["Kunde", "Fahrzeug", "Angebot"],
      intakeTarget: "Vertrag",
      reviewChecks: ["Vertrag", "Checkliste", "Pflichtangaben"],
      reviewBadge: "Geprüft",
      closingOutputs: ["Rechnung", "Archiv", "Folgeaufgabe"],
      closingBadge: "Abgeschlossen",
      closingArchiveNote: "Sicher abgelegt",
    },
  },
  en: {
    title: "Sales workflow",
    intro: "Three clear steps so every deal moves cleanly from intake to completion.",
    stepLabel: "Step",
    steps: [
      {
        title: "Sync intake",
        description: "Customer, vehicle, and quote data are merged into one active timeline.",
      },
      {
        title: "Validate deal",
        description: "Contracts, checks, and compliance points run in parallel through the flow.",
      },
      {
        title: "Commit closure",
        description: "Invoice, archive, and follow-up actions are triggered in one handoff.",
      },
    ],
    visuals: {
      intakeSources: ["Customer", "Vehicle", "Quote"],
      intakeTarget: "Contract",
      reviewChecks: ["Contract", "Checklist", "Compliance"],
      reviewBadge: "Verified",
      closingOutputs: ["Invoice", "Archive", "Follow-up"],
      closingBadge: "Closed",
      closingArchiveNote: "Securely stored",
    },
  },
  it: {
    title: "Workflow di vendita",
    intro: "Tre passaggi chiari perché ogni vendita proceda in modo pulito e senza interruzioni.",
    stepLabel: "Passo",
    steps: [
      {
        title: "Sincronizza intake",
        description: "Cliente, veicolo e preventivo confluiscono in una timeline unica.",
      },
      {
        title: "Valida trattativa",
        description: "Contratti, controlli e compliance scorrono in parallelo.",
      },
      {
        title: "Conferma chiusura",
        description: "Fattura, archivio e follow-up partono in un solo passaggio.",
      },
    ],
    visuals: {
      intakeSources: ["Cliente", "Veicolo", "Preventivo"],
      intakeTarget: "Contratto",
      reviewChecks: ["Contratto", "Checklist", "Compliance"],
      reviewBadge: "Verificato",
      closingOutputs: ["Fattura", "Archivio", "Follow-up"],
      closingBadge: "Chiuso",
      closingArchiveNote: "Archiviato in sicurezza",
    },
  },
  fr: {
    title: "Parcours de vente",
    intro: "Trois étapes claires pour faire avancer chaque vente proprement, sans rupture.",
    stepLabel: "Étape",
    steps: [
      {
        title: "Synchroniser l'intake",
        description: "Clients, véhicules et devis sont réunis dans une seule timeline active.",
      },
      {
        title: "Valider le deal",
        description: "Contrats, contrôles et conformité avancent en parallèle.",
      },
      {
        title: "Finaliser la clôture",
        description: "Facture, archivage et suivi sont lancés en un seul commit.",
      },
    ],
    visuals: {
      intakeSources: ["Client", "Véhicule", "Devis"],
      intakeTarget: "Contrat",
      reviewChecks: ["Contrat", "Checklist", "Conformité"],
      reviewBadge: "Vérifié",
      closingOutputs: ["Facture", "Archivage", "Suivi"],
      closingBadge: "Clôturé",
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
