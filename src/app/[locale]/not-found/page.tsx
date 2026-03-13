import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getLocaleDictionary, type LocalePageProps } from "@/lib/locale-route.server"

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { dictionary } = await getLocaleDictionary(params)
  const { meta } = dictionary.NotFoundPage

  return {
    title: meta.title,
    description: meta.description,
  }
}

export default function NotFoundRoutePage() {
  notFound()
}
