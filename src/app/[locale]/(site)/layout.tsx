import { SiteFooter } from "@/components/layout/footer"
import { SiteHeader } from "@/components/layout/header"
import { getDictionary } from "@/lib/i18n.server"
import { getLocaleOrNotFound } from "@/lib/locale-route.server"

type SiteShellLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

const skipLinkByLocale = {
  de: "Zum Inhalt springen",
  en: "Skip to main content",
  it: "Vai al contenuto principale",
  fr: "Aller au contenu principal",
} as const

export default async function SiteShellLayout({ children, params }: SiteShellLayoutProps) {
  const locale = await getLocaleOrNotFound(params)
  const dictionary = getDictionary(locale)

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[70] rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-[0_18px_40px_-30px_rgba(16,29,69,0.3)] focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {skipLinkByLocale[locale]}
      </a>
      <SiteHeader locale={locale} navigation={dictionary.Navigation} />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter locale={locale} footer={dictionary.Footer} />
    </div>
  )
}
