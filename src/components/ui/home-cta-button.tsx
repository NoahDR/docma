import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { AppLocale } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { getNotFoundCopy } from "@/lib/not-found-copy"

type HomeCtaButtonProps = Readonly<{
  locale: AppLocale
  navigationMode?: "client" | "document"
  className?: string
}>

export function HomeCtaButton({
  locale,
  navigationMode = "client",
  className,
}: HomeCtaButtonProps) {
  const copy = getNotFoundCopy(locale)
  const href = `/${locale}`
  const content = (
    <>
      {copy.primaryCta}
      <ArrowUpRight data-icon="inline-end" aria-hidden />
    </>
  )

  if (navigationMode === "document") {
    return (
      <a href={href} className={cn(buttonVariants({ variant: "secondary", size: "lg" }), className)}>
        {content}
      </a>
    )
  }

  return (
    <Button variant="secondary" size="lg" className={className} asChild>
      <Link href={href}>{content}</Link>
    </Button>
  )
}
