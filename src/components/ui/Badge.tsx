// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "forest" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
        variant === "default" && "bg-mint-fog text-forest border border-border",
        variant === "forest" && "bg-forest text-white",
        variant === "outline" && "bg-white text-forest border border-border",
        className
      )}
    >
      {children}
    </span>
  );
}
