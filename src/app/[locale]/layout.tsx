import type { Metadata } from "next"
import Script from "next/script"

import { appFontVariables } from "@/app/fonts"
import { locales } from "@/lib/i18n"
import { getLocaleOrNotFound } from "@/lib/locale-route.server"
import { themeInitScript } from "@/lib/theme"

import "../globals.css"

function getMetadataBase() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined)

  if (!siteUrl) {
    return undefined
  }

  try {
    return new URL(siteUrl)
  } catch {
    return undefined
  }
}

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "AutoSaaS",
    template: "%s | AutoSaaS",
  },
  description:
    "AutoSaaS bringt CRM, Fahrzeugverwaltung und Abrechnung in einen klaren Workflow für moderne Autohäuser.",
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const locale = await getLocaleOrNotFound(params)

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={appFontVariables}
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        {children}
      </body>
    </html>
  )
}
