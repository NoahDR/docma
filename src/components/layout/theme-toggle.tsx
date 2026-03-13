"use client"

import type { VariantProps } from "class-variance-authority"
import { useEffect, useState, useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { AppLocale } from "@/lib/i18n"
import {
  THEME_CHANGE_EVENT,
  THEME_STORAGE_KEY,
  Theme,
  applyTheme,
  readThemeFromDom,
} from "@/lib/theme"
import { cn } from "@/lib/utils"

function subscribeToTheme(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {}
  }

  const handleThemeChange = () => {
    onStoreChange()
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      onStoreChange()
    }
  }

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)
  window.addEventListener("storage", handleStorageChange)

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
    window.removeEventListener("storage", handleStorageChange)
  }
}

type ThemeToggleProps = {
  className?: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  locale?: AppLocale
}

const themeLabelByLocale: Record<AppLocale, { light: string; dark: string }> = {
  de: {
    light: "Zu hellem Design wechseln",
    dark: "Zu dunklem Design wechseln",
  },
  en: {
    light: "Switch to light theme",
    dark: "Switch to dark theme",
  },
  it: {
    light: "Passa al tema chiaro",
    dark: "Passa al tema scuro",
  },
  fr: {
    light: "Passer au thème clair",
    dark: "Passer au thème sombre",
  },
}

export function ThemeToggle({
  className,
  variant = "outline",
  size = "icon-sm",
  locale = "de",
}: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribeToTheme, readThemeFromDom, () => "light")
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark"
    setIsAnimating(true)
    applyTheme(nextTheme)
  }

  useEffect(() => {
    if (!isAnimating) {
      return
    }

    const timeout = window.setTimeout(() => {
      setIsAnimating(false)
    }, 520)

    return () => window.clearTimeout(timeout)
  }, [isAnimating])

  const isDark = theme === "dark"

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-label={isDark ? themeLabelByLocale[locale].light : themeLabelByLocale[locale].dark}
      className={cn("theme-toggle-shell", className)}
      data-animating={isAnimating ? "true" : "false"}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon" data-animating={isAnimating ? "true" : "false"}>
        {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
      </span>
    </Button>
  )
}
