import { cn } from "@/lib/utils"

type SectionIntroProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) {
  return (
    <header
      className={cn(
        "section-intro min-w-0 flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? <p className="type-eyebrow text-accent">{eyebrow}</p> : null}
      <h2 className={cn("type-title-lg max-w-[18ch] [overflow-wrap:anywhere] hyphens-auto", titleClassName)}>{title}</h2>
      {description ? (
        <p
          className={cn(
            "type-lead max-w-[62ch] text-muted-foreground [overflow-wrap:anywhere] hyphens-auto",
            align === "center" && "mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}
