import { CheckCircle2, Clock3, Rocket } from "lucide-react"

import { MotionReveal } from "@/components/motion/reveal"
import { SectionIntro } from "@/components/ui/section-intro"
import { SurfacePanel } from "@/components/ui/surface-panel"
import { AppLocale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type PhaseStatus = "live" | "development" | "roadmap"

type Phase = {
  status: PhaseStatus
  badge: string
  title: string
  subtitle: string
  features: string[]
}

type VisionCopy = {
  eyebrow: string
  title: string
  description: string
  phases: [Phase, Phase, Phase]
}

const copyByLocale: Record<AppLocale, VisionCopy> = {
  en: {
    eyebrow: "Product Roadmap",
    title: "Built for today. Architected for tomorrow.",
    description:
      "AutoSaaS begins as a precision-engineered DMS. Every module is designed to expand into a complete ERP for dealerships, workshop networks, and dealer groups.",
    phases: [
      {
        status: "live",
        badge: "Live Now",
        title: "Dealer Management System",
        subtitle: "Your complete DMS, operational today.",
        features: [
          "Vehicle inventory & VIN management",
          "Customer CRM & interaction history",
          "Sales pipeline & digital contracting",
          "Workshop work orders & technician dispatch",
          "Parts billing & labor time tracking",
          "XRechnung / ZUGFeRD invoicing",
        ],
      },
      {
        status: "development",
        badge: "In Development",
        title: "ERP Foundation",
        subtitle: "Full operations management, expanding now.",
        features: [
          "HR & employee management",
          "Parts supply chain & procurement",
          "Multi-location & dealer group support",
          "Advanced finance & accounting module",
        ],
      },
      {
        status: "roadmap",
        badge: "2026 Roadmap",
        title: "Full Dealership ERP",
        subtitle: "Your complete business operating system.",
        features: [
          "OEM & manufacturer API integrations",
          "Group-level analytics & benchmarking",
          "Dealer network hub",
          "White-label & franchise deployment",
        ],
      },
    ],
  },
  de: {
    eyebrow: "Produkt-Roadmap",
    title: "Für heute gebaut. Für morgen architektiert.",
    description:
      "AutoSaaS beginnt als präzise entwickeltes DMS. Jedes Modul ist darauf ausgelegt, zu einem vollständigen ERP für Autohäuser, Werkstattnetzwerke und Händlergruppen zu wachsen.",
    phases: [
      {
        status: "live",
        badge: "Jetzt verfügbar",
        title: "Dealer-Management-System",
        subtitle: "Ihr vollständiges DMS, heute einsatzbereit.",
        features: [
          "Fahrzeugbestand & FIN-Verwaltung",
          "Kunden-CRM & Interaktionshistorie",
          "Verkaufs-Pipeline & digitale Verträge",
          "Werkstattaufträge & Technikerplanung",
          "Teileabrechnung & Arbeitszeiterfassung",
          "XRechnung / ZUGFeRD-Fakturierung",
        ],
      },
      {
        status: "development",
        badge: "In Entwicklung",
        title: "ERP-Grundlage",
        subtitle: "Vollständiges Operations-Management, jetzt im Aufbau.",
        features: [
          "Personal & Mitarbeiterverwaltung",
          "Teile-Lieferkette & Einkauf",
          "Multi-Standort & Händlergruppen-Support",
          "Erweitertes Finanz- & Buchhaltungsmodul",
        ],
      },
      {
        status: "roadmap",
        badge: "Roadmap 2026",
        title: "Vollständiges Autohaus-ERP",
        subtitle: "Ihr komplettes Geschäfts-Betriebssystem.",
        features: [
          "OEM & Hersteller-API-Integrationen",
          "Gruppen-Analysen & Benchmarking",
          "Händlernetzwerk-Hub",
          "White-Label & Franchise-Deployment",
        ],
      },
    ],
  },
  fr: {
    eyebrow: "Feuille de route produit",
    title: "Conçu pour aujourd'hui. Architecturé pour demain.",
    description:
      "AutoSaaS débute comme un DMS d'ingénierie de précision. Chaque module est conçu pour évoluer vers un ERP complet pour les concessions, les réseaux d'ateliers et les groupes de distribution.",
    phases: [
      {
        status: "live",
        badge: "Disponible maintenant",
        title: "Système de gestion concessionnaire",
        subtitle: "Votre DMS complet, opérationnel aujourd'hui.",
        features: [
          "Inventaire & gestion VIN",
          "CRM clients & historique des interactions",
          "Pipeline de vente & contrats digitaux",
          "Ordres de travail & dispatch techniciens",
          "Facturation pièces & suivi des temps",
          "Facturation XRechnung / ZUGFeRD",
        ],
      },
      {
        status: "development",
        badge: "En développement",
        title: "Socle ERP",
        subtitle: "Gestion complète des opérations, en expansion.",
        features: [
          "RH & gestion des employés",
          "Chaîne d'approvisionnement & achats",
          "Multi-sites & groupes de concessions",
          "Module finance & comptabilité avancé",
        ],
      },
      {
        status: "roadmap",
        badge: "Feuille de route 2026",
        title: "ERP Concessionnaire complet",
        subtitle: "Votre système d'exploitation d'entreprise complet.",
        features: [
          "Intégrations API constructeurs & OEM",
          "Analyses de groupe & benchmarking",
          "Hub réseau de distribution",
          "Déploiement white-label & franchise",
        ],
      },
    ],
  },
  it: {
    eyebrow: "Roadmap di prodotto",
    title: "Costruito per oggi. Architettato per domani.",
    description:
      "AutoSaaS nasce come DMS di ingegneria di precisione. Ogni modulo è progettato per espandersi in un ERP completo per concessionarie, reti di officine e gruppi di distribuzione.",
    phases: [
      {
        status: "live",
        badge: "Disponibile ora",
        title: "Sistema di gestione concessionaria",
        subtitle: "Il tuo DMS completo, operativo oggi.",
        features: [
          "Inventario veicoli & gestione VIN",
          "CRM clienti & storico interazioni",
          "Pipeline vendite & contratti digitali",
          "Ordini di lavoro & assegnazione tecnici",
          "Fatturazione ricambi & ore di lavoro",
          "Fatturazione XRechnung / ZUGFeRD",
        ],
      },
      {
        status: "development",
        badge: "In sviluppo",
        title: "Base ERP",
        subtitle: "Gestione operativa completa, in espansione ora.",
        features: [
          "HR & gestione dipendenti",
          "Catena di fornitura ricambi & acquisti",
          "Multi-sede & supporto gruppi concessionarie",
          "Modulo finanza & contabilità avanzato",
        ],
      },
      {
        status: "roadmap",
        badge: "Roadmap 2026",
        title: "ERP Concessionaria completo",
        subtitle: "Il tuo sistema operativo aziendale completo.",
        features: [
          "Integrazioni API OEM & costruttori",
          "Analytics di gruppo & benchmarking",
          "Hub rete dealer",
          "Deployment white-label & franchise",
        ],
      },
    ],
  },
}

const statusConfig = {
  live: {
    icon: CheckCircle2,
    badgeClass:
      "text-[oklch(0.55_0.18_155)] border-[oklch(0.55_0.18_155)]/25 bg-[oklch(0.55_0.18_155)]/10",
    dotClass: "bg-[oklch(0.55_0.18_155)] status-dot",
    featureIconClass: "bg-[oklch(0.55_0.18_155)]/12 text-[oklch(0.55_0.18_155)]",
  },
  development: {
    icon: Clock3,
    badgeClass: "text-accent border-accent/25 bg-accent/10",
    dotClass: "bg-accent",
    featureIconClass: "bg-accent/10 text-accent",
  },
  roadmap: {
    icon: Rocket,
    badgeClass: "text-muted-foreground border-border bg-muted/60",
    dotClass: "bg-muted-foreground/60",
    featureIconClass: "bg-muted text-muted-foreground",
  },
} satisfies Record<PhaseStatus, { icon: React.ComponentType<{ className?: string }>; badgeClass: string; dotClass: string; featureIconClass: string }>

export function VisionSection({ locale }: { locale: AppLocale }) {
  const copy = copyByLocale[locale]

  return (
    <section className="section-rule relative overflow-hidden px-4 py-16 md:px-8 md:py-20">
      <div className="ornament-grid" aria-hidden />
      <div className="page-shell">
        <MotionReveal variant="soft" className="max-w-[60rem]">
          <SectionIntro
            eyebrow={copy.eyebrow}
            title={copy.title}
            description={copy.description}
            className="max-w-[60rem]"
          />
        </MotionReveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
          {copy.phases.map((phase, index) => {
            const config = statusConfig[phase.status]
            const Icon = config.icon

            return (
              <MotionReveal
                key={phase.title}
                delay={index * 90}
                duration={700}
                variant={index === 0 ? "left" : index === 1 ? "up" : "right"}
                className="h-full"
              >
                <SurfacePanel
                  tone={index === 0 ? "strong" : "soft"}
                  padding="lg"
                  className={cn(
                    "interactive-panel h-full",
                    index === 0 && "color-success"
                  )}
                >
                  <div className="flex h-full flex-col gap-6">
                    <div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                          config.badgeClass
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", config.dotClass)} />
                        {phase.badge}
                      </span>

                      <h3 className="mt-4 font-heading text-[clamp(1.15rem,2vw,1.6rem)] tracking-[-0.04em] text-foreground">
                        {phase.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {phase.subtitle}
                      </p>
                    </div>

                    <ul className="flex flex-1 flex-col gap-2.5">
                      {phase.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <span
                            className={cn(
                              "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full",
                              config.featureIconClass
                            )}
                          >
                            <Icon className="size-3" aria-hidden />
                          </span>
                          <span
                            className={cn(
                              "leading-snug",
                              phase.status === "roadmap"
                                ? "text-muted-foreground"
                                : "text-foreground/90"
                            )}
                          >
                            {feature}
                          </span>
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
