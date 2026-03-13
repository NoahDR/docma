import type { Metadata } from "next"

import { AuthSection } from "@/components/sections/auth-section"
import { getLocaleDictionary, type LocalePageProps } from "@/lib/locale-route.server"

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleDictionary(params)

  return {
    title: dictionary.RegisterMeta.title,
    description: dictionary.RegisterMeta.description,
  }
}

export default async function RegisterPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleDictionary(params)
  return <AuthSection locale={locale} mode="register" copy={dictionary.RegisterPage} />
}
