export const locales = ["de", "en", "it", "fr"] as const

export type AppLocale = (typeof locales)[number]
export type Dictionary = typeof import("../../messages/de.json")
export type NavigationCopy = Dictionary["Navigation"]
export type FooterCopy = Dictionary["Footer"]
export type LandingPageCopy = Dictionary["LandingPage"]
export type FeatureItems = Dictionary["FeatureSection"]["items"]
export type LoginPageCopy = Dictionary["LoginPage"]
export type LoginFormCopy = LoginPageCopy["form"]
export type RegisterPageCopy = Dictionary["RegisterPage"]
export type RegisterFormCopy = RegisterPageCopy["form"]
export type NotFoundPageCopy = Dictionary["NotFoundPage"]

const sectionLabelsByLocale: Record<AppLocale, readonly string[]> = {
  de: ["Funktionen", "Ablauf", "Preise", "Über uns"],
  en: ["Features", "Workflow", "Pricing", "About"],
  it: ["Funzioni", "Workflow", "Prezzi", "Chi siamo"],
  fr: ["Fonctions", "Parcours", "Tarifs", "À propos"],
}

const sectionIds = ["features", "protocol", "pricing", "about"] as const

type SectionLinkItem = Readonly<{
  label: string
  href: string
}>

export function isAppLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale)
}

export function getSectionLinkItems(locale: AppLocale): ReadonlyArray<SectionLinkItem> {
  const labels = sectionLabelsByLocale[locale] ?? sectionLabelsByLocale.en

  return sectionIds.map((id, index) => ({
    label: labels[index] ?? id,
    href: `/${locale}#${id}`,
  }))
}
