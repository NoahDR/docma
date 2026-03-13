import * as React from "react"

import { cn } from "@/lib/utils"

const Label = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<"label">>(
  function Label({ className, ...props }, ref) {
    return React.createElement("label", {
      ...props,
      ref,
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-snug font-medium select-none [overflow-wrap:anywhere] peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
    })
  }
)

Label.displayName = "Label"

export { Label }
