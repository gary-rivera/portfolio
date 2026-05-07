import { cn } from "@/lib/cn";

interface HatchBarProps {
  /** Progress percentage 0-100 */
  value: number;
  label?: string;
  className?: string;
}

export function HatchBar({ value, label, className }: HatchBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex items-center gap-2 font-mono text-xs", className)}>
      {label && <span className="text-text-dim min-w-[80px] truncate">{label}</span>}
      <div className="flex-1 h-2 bg-surface-2 border border-border overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${clamped}%`,
            background:
              "repeating-linear-gradient(45deg, var(--color-accent) 0 4px, var(--color-accent-muted) 4px 8px)",
          }}
        />
      </div>
      <span className="text-accent tabular-nums min-w-[36px] text-right">{clamped}%</span>
    </div>
  );
}
