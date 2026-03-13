import de from "../../messages/de.json"
import en from "../../messages/en.json"
import fr from "../../messages/fr.json"
import it from "../../messages/it.json"

import { AppLocale, NotFoundPageCopy, isAppLocale } from "@/lib/i18n"

const notFoundCopyByLocale: Record<AppLocale, NotFoundPageCopy> = {
  de: de.NotFoundPage,
  en: en.NotFoundPage,
  it: it.NotFoundPage,
  fr: fr.NotFoundPage,
}

export function getNotFoundCopy(locale: string): NotFoundPageCopy {
  return notFoundCopyByLocale[isAppLocale(locale) ? locale : "de"]
}
