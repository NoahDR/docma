import { LockKeyhole, ServerCog, ShieldCheck } from "lucide-react"

import { InfoStack } from "@/components/ui/info-stack"
import { cn } from "@/lib/utils"

type TrustItem = {
  label: string
}

const icons = [ShieldCheck, ServerCog, LockKeyhole] as const

export function TrustIndicators({ items, className }: { items: TrustItem[]; className?: string }) {
  return (
    <div className={cn(className)}>
      <InfoStack
        items={items.map((item, index) => ({
          label: item.label,
          icon: icons[index] ?? ShieldCheck,
        }))}
      />
    </div>
  )
}
