import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type InfoItem = {
  label: string
  icon?: LucideIcon
  meta?: string
}

type InfoStackProps = {
  items: readonly InfoItem[]
  layout?: "list" | "inline"
  className?: string
}

export function InfoStack({ items, layout = "list", className }: InfoStackProps) {
  return (
    <ul
      className={cn(
        layout === "inline"
          ? "flex flex-wrap gap-x-5 gap-y-2"
          : "grid gap-3",
        className
      )}
    >
      {items.map(({ icon: Icon, label, meta }) => (
        <li
          key={`${meta ?? ""}-${label}`}
          className={cn(
            "min-w-0",
            layout === "inline"
              ? "inline-flex items-center gap-2 text-sm text-muted-foreground"
              : meta
                ? "grid grid-cols-[2.5rem_1fr] items-start gap-3 text-sm text-muted-foreground"
                : "grid grid-cols-[2.5rem_1fr] items-center gap-3 text-sm text-muted-foreground"
          )}
        >
          {Icon ? (
            <span
              className={cn(
                "inline-flex shrink-0 items-center justify-center text-accent",
                layout === "inline"
                  ? "size-4"
                  : "size-10 rounded-[1rem] border border-accent/16 bg-accent/10"
              )}
            >
              <Icon className={layout === "inline" ? "size-4" : "size-[1.125rem]"} aria-hidden />
            </span>
          ) : null}
          <span
            className={cn(
              "min-w-0",
              layout === "list" && !meta && "flex min-h-10 items-center"
            )}
          >
            {meta ? (
              <span className="text-mono block text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                {meta}
              </span>
            ) : null}
            <span className="block text-balance [overflow-wrap:anywhere] hyphens-auto">{label}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
