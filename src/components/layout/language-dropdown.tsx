"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { VariantProps } from "class-variance-authority"
import { Check } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { AppLocale, isAppLocale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const languageOptions: Array<{ code: AppLocale; label: string }> = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
]

const triggerLabelByLocale: Record<AppLocale, (currentLanguage: string) => string> = {
  de: (currentLanguage) => `Sprache wechseln. Aktuell ${currentLanguage}.`,
  en: (currentLanguage) => `Change language. Current language: ${currentLanguage}.`,
  it: (currentLanguage) => `Cambia lingua. Lingua attuale: ${currentLanguage}.`,
  fr: (currentLanguage) => `Changer de langue. Langue actuelle : ${currentLanguage}.`,
}

function buildLocalizedPath(pathname: string, targetLocale: AppLocale) {
  if (pathname === "/") {
    return `/${targetLocale}`
  }

  const segments = pathname.split("/").filter(Boolean)

  if (segments.length > 0 && isAppLocale(segments[0])) {
    segments[0] = targetLocale
    return `/${segments.join("/")}`
  }

  return `/${targetLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`
}

type LanguageDropdownProps = {
  locale: AppLocale
  buttonClassName?: string
  labelMode?: "code" | "name"
  menuPlacement?: "bottom-end" | "bottom-start" | "top-end" | "top-start"
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
}

export function LanguageDropdown({
  locale,
  buttonClassName,
  labelMode = "code",
  menuPlacement = "bottom-end",
  variant = "outline",
  size = "sm",
}: LanguageDropdownProps) {
  const router = useRouter()
  const pathname = usePathname()
  const menuId = useId()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const currentOption = languageOptions.find((option) => option.code === locale) ?? languageOptions[0]
  const isLabelMode = labelMode === "name"

  const menuPlacementClassName = {
    "bottom-end": "right-0 top-[calc(100%+0.6rem)] origin-top-right",
    "bottom-start": "left-0 top-[calc(100%+0.6rem)] origin-top-left",
    "top-end": "bottom-[calc(100%+0.6rem)] right-0 origin-bottom-right",
    "top-start": "bottom-[calc(100%+0.6rem)] left-0 origin-bottom-left",
  }[menuPlacement]

  const menuClosedClassName =
    menuPlacement === "top-end" || menuPlacement === "top-start"
      ? "pointer-events-none translate-y-1 opacity-0"
      : "pointer-events-none -translate-y-1 opacity-0"

  const switchLocale = (nextLocale: AppLocale) => {
    if (nextLocale === locale) {
      return
    }

    const nextPath = buildLocalizedPath(pathname, nextLocale)
    const query = typeof window !== "undefined" ? window.location.search : ""
    const hash = typeof window !== "undefined" ? window.location.hash : ""

    router.push(`${nextPath}${query}${hash}`)
  }

  useEffect(() => {
    if (!open) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target

      if (
        target instanceof Node &&
        !buttonRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    window.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      return
    }

    const selectedIndex = languageOptions.findIndex((option) => option.code === locale)
    const focusIndex = selectedIndex >= 0 ? selectedIndex : 0
    const frame = window.requestAnimationFrame(() => {
      optionRefs.current[focusIndex]?.focus()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [locale, open])

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return
    }

    event.preventDefault()
    setOpen(true)
  }

  const handleOptionKeyDown =
    (index: number) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        optionRefs.current[(index + 1) % languageOptions.length]?.focus()
        return
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        optionRefs.current[(index - 1 + languageOptions.length) % languageOptions.length]?.focus()
        return
      }

      if (event.key === "Home") {
        event.preventDefault()
        optionRefs.current[0]?.focus()
        return
      }

      if (event.key === "End") {
        event.preventDefault()
        optionRefs.current[languageOptions.length - 1]?.focus()
      }
    }

  const handleSelect = (nextLocale: AppLocale) => {
    setOpen(false)
    buttonRef.current?.focus()
    switchLocale(nextLocale)
  }

  return (
    <div className="group/locale relative">
      <button
        ref={buttonRef}
        type="button"
        aria-label={triggerLabelByLocale[locale](currentOption.label)}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-expanded={open}
        className={cn(
          buttonVariants({ variant, size }),
          isLabelMode
            ? "min-w-[9.5rem] justify-between gap-3 px-4 text-sm font-medium normal-case tracking-normal"
            : "min-w-[4.75rem] whitespace-nowrap px-3 text-[11px] font-semibold uppercase tracking-[0.12em]",
          buttonClassName
        )}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="min-w-0 truncate">{isLabelMode ? currentOption.label : currentOption.code.toUpperCase()}</span>
      </button>

      <div
        id={menuId}
        ref={menuRef}
        role="listbox"
        aria-label={triggerLabelByLocale[locale](currentOption.label)}
        aria-hidden={!open}
        className={cn(
          "surface-panel surface-panel-strong !absolute z-50 min-w-[13.5rem] rounded-[1.25rem] p-1.5 shadow-[0_28px_56px_-38px_rgba(16,29,69,0.4)] transition-[opacity,transform] duration-200 ease-[var(--ease-emphasized)]",
          menuPlacementClassName,
          open ? "pointer-events-auto translate-y-0 opacity-100" : menuClosedClassName
        )}
      >
        <div className="grid gap-1">
          {languageOptions.map((option, index) => {
            const selected = option.code === locale

            return (
              <button
                key={option.code}
                ref={(node) => {
                  optionRefs.current[index] = node
                }}
                type="button"
                role="option"
                aria-selected={selected}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-[1rem] px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected ? "bg-accent/10 text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
                onClick={() => handleSelect(option.code)}
                onKeyDown={handleOptionKeyDown(index)}
              >
                <span className="min-w-0 truncate text-sm font-medium normal-case tracking-normal">{option.label}</span>
                <Check className={cn("size-4 text-accent transition-opacity", selected ? "opacity-100" : "opacity-0")} aria-hidden />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
