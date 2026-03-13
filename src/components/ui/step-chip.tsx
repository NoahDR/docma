import { cn } from "@/lib/utils"

type StepChipProps = {
  label: string
  step: number
  active?: boolean
  className?: string
  showIndex?: boolean
}

export function StepChip({
  label,
  step,
  active = false,
  className,
  showIndex = true,
}: StepChipProps) {
  return (
    <span className={cn("step-chip", active && "step-chip-active", className)}>
      {showIndex ? <span className="step-chip-index">{step}</span> : null}
      <span>{label}</span>
    </span>
  )
}
