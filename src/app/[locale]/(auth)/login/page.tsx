import type { Metadata } from "next"

import { AuthSection } from "@/components/sections/auth-section"
import { getLocaleDictionary, type LocalePageProps } from "@/lib/locale-route.server"

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleDictionary(params)

  return {
    title: dictionary.LoginMeta.title,
    description: dictionary.LoginMeta.description,
  }
}

export default async function LoginPage({ params }: LocalePageProps) {
  const { locale, dictionary } = await getLocaleDictionary(params)
  return <AuthSection locale={locale} mode="login" copy={dictionary.LoginPage} />
}
