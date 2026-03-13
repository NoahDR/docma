import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex min-w-0 shrink-0 touch-manipulation items-center justify-center rounded-full border text-center text-sm font-semibold leading-tight tracking-[-0.01em] whitespace-normal outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/32 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/36 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary/85 bg-primary text-primary-foreground [box-shadow:var(--button-shadow-primary)] hover:border-primary hover:bg-primary/94",
        outline:
          "border-border bg-background/72 text-foreground [box-shadow:var(--button-shadow-outline)] hover:bg-muted/78 aria-expanded:bg-muted/78 aria-expanded:text-foreground",
        secondary:
          "border-secondary/72 bg-secondary text-secondary-foreground [box-shadow:var(--button-shadow-secondary)] hover:bg-secondary/90 aria-expanded:bg-secondary/90 aria-expanded:text-secondary-foreground",
        ghost: "border-transparent bg-transparent text-foreground/82 shadow-none hover:bg-muted/62 hover:text-foreground aria-expanded:bg-muted/62 aria-expanded:text-foreground",
        destructive:
          "border-destructive/45 bg-destructive text-destructive-foreground [box-shadow:var(--button-shadow-destructive)] hover:bg-destructive/92 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        link: "h-auto border-transparent bg-transparent px-0 py-0 text-accent shadow-none underline-offset-4 hover:text-accent/80 hover:underline",
      },
      size: {
        default: "min-h-12 gap-2 px-5 py-3 sm:px-6",
        xs: "min-h-9 gap-1 rounded-[min(var(--radius-control),999px)] px-3 py-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-11 gap-1.5 rounded-[min(var(--radius-control),999px)] px-4 py-2.5 text-[13px] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-14 gap-2 px-6 py-3.5 text-base sm:px-8",
        icon: "size-12",
        "icon-xs":
          "size-9 rounded-[min(var(--radius-control),999px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-11 rounded-[min(var(--radius-control),999px)]",
        "icon-lg": "size-14 rounded-[min(var(--radius-control),999px)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
})

export { Button, buttonVariants }
