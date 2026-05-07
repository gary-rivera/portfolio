import { cn } from "@/lib/cn";

interface BlinkCursorProps {
  className?: string;
  variant?: "block" | "underscore";
}

export function BlinkCursor({ className, variant = "block" }: BlinkCursorProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block animate-blink bg-accent align-baseline",
        variant === "block" ? "w-[0.55em] h-[1.1em] -mb-[2px]" : "w-[0.55em] h-[2px]",
        className
      )}
    />
  );
}
