import Link from "next/link"

import { SurfacePanel } from "@/components/ui/surface-panel"
import { AppLocale, FooterCopy, getSectionLinkItems } from "@/lib/i18n"

type SiteFooterProps = {
  locale: AppLocale
  footer: FooterCopy
}

export function SiteFooter({ locale, footer }: SiteFooterProps) {
  const sectionLinks = getSectionLinkItems(locale)

  return (
    <footer id="about" className="section-rule relative mt-20 overflow-hidden px-4 pb-8 pt-12 md:px-8 md:pb-10 md:pt-16">
      <div className="ornament-grid" aria-hidden />
      <div className="page-shell">
        <SurfacePanel tone="strong" padding="lg" className="rounded-[2.4rem] color-highlight">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] lg:gap-10">
            <div className="max-w-[56ch] md:col-span-2 lg:col-span-1">
              <p className="font-heading text-2xl font-semibold tracking-[-0.04em] text-foreground">AutoSaaS</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{footer.tagline}</p>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">Navigation</p>
              <ul className="mt-4 grid gap-2 text-sm text-foreground/80">
                {sectionLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-accent">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">Legal</p>
              <ul className="mt-4 grid gap-2 text-sm text-foreground/80">
                <li>
                  <Link href={`/${locale}/login`} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-accent">
                    {footer.login}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/not-found`} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-accent">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/not-found`} className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-accent">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border/70 pt-5 text-sm text-muted-foreground">
            {footer.copyright}
          </div>
        </SurfacePanel>
      </div>
    </footer>
  )
}
