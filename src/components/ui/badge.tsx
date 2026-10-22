import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary:
          "border-border/60 bg-secondary text-secondary-foreground",
        destructive:
          "border-red-200 bg-red-50 text-red-700",
        danger:
          "border-red-200 bg-red-50 text-red-700",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-800",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800",
        info:
          "border-sky-200 bg-sky-50 text-sky-800",
        neutral:
          "border-slate-200 bg-slate-100 text-slate-700",
        outline: "border-border text-foreground",
      },
      size: {
        sm: "text-[11px] px-2 py-0.5",
        md: "text-xs px-2.5 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
}

function Badge({
  className,
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const dotColorMap: Record<string, string> = {
    success: "bg-emerald-600",
    warning: "bg-amber-600",
    info: "bg-sky-600",
    danger: "bg-red-600",
    destructive: "bg-red-600",
    neutral: "bg-slate-500",
    default: "bg-white",
    secondary: "bg-slate-600",
    outline: "bg-slate-400",
  }

  const dotColor = (variant && dotColorMap[variant]) || "bg-slate-400"

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColor)}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
