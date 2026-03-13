"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type RefObject } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { LanguageDropdown } from "@/components/layout/language-dropdown"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { AppLocale, NavigationCopy, getSectionLinkItems } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type SiteHeaderProps = {
  locale: AppLocale
  navigation: NavigationCopy
}

type DrawerPhase = "closed" | "opening" | "open" | "closing"

type SectionLink = Readonly<{
  label: string
  href: string
}>

type BrandLinkProps = {
  href: string
  compact?: boolean
  onClick?: () => void
}

type SectionNavProps = {
  ariaLabel: string
  sectionLinks: ReadonlyArray<SectionLink>
  className: string
  linkClassName: string
  onNavigate?: () => void
}

type DesktopHeaderActionsProps = {
  locale: AppLocale
  navigation: NavigationCopy
}

type MobileHeaderActionsProps = {
  locale: AppLocale
  drawerOpen: boolean
  menuButtonRef: RefObject<HTMLButtonElement | null>
  onToggle: () => void
}

type MobileNavDrawerProps = {
  locale: AppLocale
  navigation: NavigationCopy
  sectionLinks: ReadonlyArray<SectionLink>
  drawerOpen: boolean
  drawerMounted: boolean
  drawerPanelRef: RefObject<HTMLDivElement | null>
  onClose: () => void
}

const drawerLabels: Record<AppLocale, { open: string; close: string }> = {
  de: { open: "Menü öffnen", close: "Menü schließen" },
  en: { open: "Open menu", close: "Close menu" },
  it: { open: "Apri menu", close: "Chiudi menu" },
  fr: { open: "Ouvrir le menu", close: "Fermer le menu" },
}

const DRAWER_FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], select, input, textarea, [tabindex]:not([tabindex="-1"])'

function useHeaderSolidState() {
  const [isSolid, setIsSolid] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero-section")

    if (!hero) {
      const onScroll = () => {
        setIsSolid(window.scrollY > 64)
      }

      onScroll()
      window.addEventListener("scroll", onScroll, { passive: true })
      return () => window.removeEventListener("scroll", onScroll)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSolid(!entry.isIntersecting)
      },
      {
        threshold: 0.22,
      }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return isSolid
}

function useHeaderDrawerController() {
  const [drawerPhase, setDrawerPhase] = useState<DrawerPhase>("closed")
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const drawerPanelRef = useRef<HTMLDivElement | null>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const drawerOpen = drawerPhase === "opening" || drawerPhase === "open"
  const drawerMounted = drawerPhase !== "closed"

  const openDrawer = () => {
    restoreFocusRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : menuButtonRef.current

    setDrawerPhase((phase) => (phase === "closed" ? "opening" : "open"))
  }

  const closeDrawer = () => {
    setDrawerPhase((phase) => (phase === "closed" ? phase : "closing"))
  }

  const toggleDrawer = () => {
    if (drawerOpen) {
      closeDrawer()
      return
    }

    openDrawer()
  }

  useEffect(() => {
    if (drawerPhase === "closed") {
      delete document.body.dataset.navOpen
      return
    }

    document.body.dataset.navOpen = "true"

    return () => {
      delete document.body.dataset.navOpen
    }
  }, [drawerPhase])

  useEffect(() => {
    if (drawerPhase === "closed") {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setDrawerPhase((phase) => (phase === "closed" ? phase : "closing"))
        return
      }

      if (event.key !== "Tab") {
        return
      }

      const drawer = drawerPanelRef.current

      if (!drawer) {
        return
      }

      const focusableItems = Array.from(drawer.querySelectorAll<HTMLElement>(DRAWER_FOCUSABLE_SELECTOR))

      if (focusableItems.length === 0) {
        return
      }

      const firstFocusable = focusableItems[0]
      const lastFocusable = focusableItems[focusableItems.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey) {
        if (activeElement === firstFocusable || !drawer.contains(activeElement)) {
          event.preventDefault()
          lastFocusable.focus()
        }

        return
      }

      if (activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [drawerPhase])

  useEffect(() => {
    if (drawerPhase === "opening") {
      const frame = window.requestAnimationFrame(() => {
        setDrawerPhase("open")
      })

      return () => window.cancelAnimationFrame(frame)
    }

    if (drawerPhase === "closing") {
      const timeout = window.setTimeout(() => {
        setDrawerPhase("closed")
      }, 260)

      return () => window.clearTimeout(timeout)
    }
  }, [drawerPhase])

  useEffect(() => {
    if (drawerPhase !== "open") {
      if (drawerPhase === "closed") {
        if (restoreFocusRef.current?.isConnected) {
          restoreFocusRef.current.focus({ preventScroll: true })
        } else {
          menuButtonRef.current?.focus({ preventScroll: true })
        }

        restoreFocusRef.current = null
      }

      return
    }

    const firstFocusable = drawerPanelRef.current?.querySelector<HTMLElement>(DRAWER_FOCUSABLE_SELECTOR)

    firstFocusable?.focus()
  }, [drawerPhase])

  return {
    drawerMounted,
    drawerOpen,
    drawerPanelRef,
    menuButtonRef,
    closeDrawer,
    toggleDrawer,
  }
}

function BrandLink({ href, compact = false, onClick }: BrandLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 min-w-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        compact ? "px-1 py-1" : "group px-1.5 py-1"
      )}
      onClick={onClick}
    >
      <span className="brand-mark color-highlight inline-flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
        A
      </span>
      <span
        className={cn(
          "font-heading font-semibold tracking-[-0.03em]",
          compact ? "text-base" : "hidden truncate text-sm min-[360px]:inline sm:text-base md:text-lg"
        )}
      >
        AutoSaaS
      </span>
    </Link>
  )
}

function SectionNav({ ariaLabel, sectionLinks, className, linkClassName, onNavigate }: SectionNavProps) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {sectionLinks.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={linkClassName}
          onClick={onNavigate}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

function DesktopHeaderActions({ locale, navigation }: DesktopHeaderActionsProps) {
  return (
    <div className="hidden items-center gap-1.5 xl:flex">
      <LanguageDropdown locale={locale} size="icon-sm" buttonClassName="min-w-0 size-11 px-0" />
      <ThemeToggle locale={locale} />
      <Button variant="outline" size="sm" asChild>
        <Link href={`/${locale}/login`}>{navigation.login}</Link>
      </Button>
      <Button variant="secondary" size="sm" asChild>
        <Link href={`/${locale}/register`}>
          {navigation.cta}
          <ArrowUpRight data-icon="inline-end" aria-hidden />
        </Link>
      </Button>
    </div>
  )
}

function MobileHeaderActions({
  locale,
  drawerOpen,
  menuButtonRef,
  onToggle,
}: MobileHeaderActionsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 xl:hidden">
      <ThemeToggle locale={locale} />
      <Button
        ref={menuButtonRef}
        type="button"
        variant="outline"
        size="icon-sm"
        aria-expanded={drawerOpen}
        aria-controls="mobile-nav-drawer"
        aria-label={drawerOpen ? drawerLabels[locale].close : drawerLabels[locale].open}
        onClick={onToggle}
      >
        {drawerOpen ? <X aria-hidden /> : <Menu aria-hidden />}
      </Button>
    </div>
  )
}

function MobileNavDrawer({
  locale,
  navigation,
  sectionLinks,
  drawerOpen,
  drawerMounted,
  drawerPanelRef,
  onClose,
}: MobileNavDrawerProps) {
  if (!drawerMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 z-40 px-3 pb-3 pt-18 sm:px-4 sm:pb-4 sm:pt-20 xl:hidden">
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-[rgba(10,18,35,0.18)] backdrop-blur-[2px] transition-opacity duration-200 ease-[var(--ease-emphasized)] dark:bg-[rgba(5,11,22,0.46)]",
          drawerOpen ? "opacity-100" : "opacity-0"
        )}
        aria-label={drawerLabels[locale].close}
        onClick={onClose}
      />

      <div
        id="mobile-nav-drawer"
        ref={drawerPanelRef}
        role="dialog"
        aria-modal="true"
        aria-label={navigation.aria}
        className={cn(
          "surface-panel surface-panel-strong relative flex max-h-[calc(100svh-5.25rem)] w-full flex-col overflow-y-auto rounded-[1.75rem] p-4 transition-[opacity,transform] duration-300 ease-[var(--ease-emphasized)] sm:ml-auto sm:max-h-[calc(100svh-6rem)] sm:max-w-sm sm:rounded-[2rem] sm:p-5",
          drawerOpen
            ? "translate-y-0 scale-100 opacity-100 sm:translate-x-0"
            : "translate-y-3 scale-[0.985] opacity-0 sm:translate-x-4 sm:translate-y-0"
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <BrandLink href={`/${locale}`} compact onClick={onClose} />

          <Button type="button" variant="ghost" size="icon-sm" aria-label={drawerLabels[locale].close} onClick={onClose}>
            <X aria-hidden />
          </Button>
        </div>

        <SectionNav
          ariaLabel={navigation.aria}
          sectionLinks={sectionLinks}
          className="mt-6 flex flex-col gap-1.5"
          linkClassName="surface-panel surface-panel-quiet min-h-11 rounded-[1.25rem] px-4 py-3 text-[0.95rem] font-medium text-foreground transition-colors hover:bg-muted/54"
          onNavigate={onClose}
        />

        <div className="mt-auto grid gap-3 pt-6">
          <div className="flex flex-wrap items-center gap-2">
            <LanguageDropdown locale={locale} size="icon-sm" buttonClassName="min-w-0 size-11 px-0" />
            <ThemeToggle locale={locale} />
            <Button
              variant="outline"
              className="w-full justify-center sm:ml-auto sm:w-auto sm:min-w-[8rem]"
              asChild
              onClick={onClose}
            >
              <Link href={`/${locale}/login`}>{navigation.login}</Link>
            </Button>
          </div>

          <Button variant="secondary" size="lg" className="w-full justify-center" asChild onClick={onClose}>
            <Link href={`/${locale}/register`}>
              {navigation.cta}
              <ArrowUpRight data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const isSolid = useHeaderSolidState()
  const {
    drawerMounted,
    drawerOpen,
    drawerPanelRef,
    menuButtonRef,
    closeDrawer,
    toggleDrawer,
  } = useHeaderDrawerController()
  const sectionLinks = getSectionLinkItems(locale)

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6">
        <div className="mx-auto max-w-[90rem]">
          <div
            className={cn(
              "floating-island pointer-events-auto grid min-h-[4rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-2.5 py-2 sm:px-3 md:min-h-[4.4rem] md:px-4 xl:grid-cols-[auto_1fr_auto]",
              isSolid ? "is-solid" : "is-ghost"
            )}
          >
            <BrandLink href={`/${locale}`} />

            <SectionNav
              ariaLabel={navigation.aria}
              sectionLinks={sectionLinks}
              className="hidden items-center justify-center gap-1 xl:flex"
              linkClassName="inline-flex min-h-11 min-w-11 items-center rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <div className="flex items-center justify-end gap-1.5 self-center md:gap-2">
              <DesktopHeaderActions locale={locale} navigation={navigation} />
              <MobileHeaderActions
                locale={locale}
                drawerOpen={drawerOpen}
                menuButtonRef={menuButtonRef}
                onToggle={toggleDrawer}
              />
            </div>
          </div>
        </div>
      </header>

      <MobileNavDrawer
        locale={locale}
        navigation={navigation}
        sectionLinks={sectionLinks}
        drawerOpen={drawerOpen}
        drawerMounted={drawerMounted}
        drawerPanelRef={drawerPanelRef}
        onClose={closeDrawer}
      />
    </>
  )
}
