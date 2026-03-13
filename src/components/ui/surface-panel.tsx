import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const surfacePanelVariants = cva("surface-panel", {
  variants: {
    tone: {
      default: "",
      soft: "surface-panel-soft",
      strong: "surface-panel-strong",
      hero: "surface-panel-hero",
      quiet: "surface-panel-quiet",
      inset: "surface-panel-inset",
    },
    padding: {
      none: "",
      sm: "p-4 md:p-5",
      md: "p-5 md:p-6",
      lg: "p-6 md:p-7 lg:p-8",
    },
  },
  defaultVariants: {
    tone: "default",
    padding: "md",
  },
})

type SurfacePanelOwnProps = VariantProps<typeof surfacePanelVariants> & {
  as?: React.ElementType
}

type SurfacePanelProps<T extends React.ElementType> = SurfacePanelOwnProps &
  Omit<React.ComponentPropsWithoutRef<T>, keyof SurfacePanelOwnProps | "as">

export function SurfacePanel<T extends React.ElementType = "div">({
  as,
  className,
  tone,
  padding,
  ...props
}: SurfacePanelProps<T>) {
  const Comp = as ?? "div"

  return (
    <Comp
      className={cn(surfacePanelVariants({ tone, padding }), className)}
      {...props}
    />
  )
}
