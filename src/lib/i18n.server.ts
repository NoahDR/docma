import "server-only"

import de from "../../messages/de.json"
import en from "../../messages/en.json"
import fr from "../../messages/fr.json"
import it from "../../messages/it.json"

import { AppLocale, Dictionary, isAppLocale } from "@/lib/i18n"

const dictionaries: Record<AppLocale, Dictionary> = {
  de,
  en,
  it,
  fr,
}

export function getDictionary(locale: string): Dictionary {
  return dictionaries[isAppLocale(locale) ? locale : "de"]
}
