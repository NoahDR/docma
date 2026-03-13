import "server-only"

import { notFound } from "next/navigation"

import { AppLocale, Dictionary, isAppLocale } from "@/lib/i18n"
import { getDictionary } from "@/lib/i18n.server"

export type LocaleRouteParams = Promise<{ locale: string }>
export type LocalePageProps = Readonly<{
  params: LocaleRouteParams
}>

export async function getLocaleOrNotFound(params: LocaleRouteParams): Promise<AppLocale> {
  const { locale } = await params

  if (!isAppLocale(locale)) {
    notFound()
  }

  return locale
}

export async function getLocaleDictionary(
  params: LocaleRouteParams
): Promise<Readonly<{ locale: AppLocale; dictionary: Dictionary }>> {
  const locale = await getLocaleOrNotFound(params)

  return {
    locale,
    dictionary: getDictionary(locale),
  }
}
