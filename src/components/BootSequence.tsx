import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const LINES = [
  "→ initializing tui …",
  "→ mounting filesystem …",
  "→ loading ~/gary-rivera",
];

interface BootSequenceProps {
  /** Time between line renders (ms). Default 150ms. */
  lineDelayMs?: number;
  /** Time the final line stays before completing (ms). Default 200ms. */
  tailMs?: number;
  onComplete: () => void;
  className?: string;
}

export function BootSequence({
  lineDelayMs = 150,
  tailMs = 200,
  onComplete,
  className,
}: BootSequenceProps) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let cancelled = false;

    function step(i: number) {
      if (cancelled) return;
      setShown(i);
      if (i < LINES.length) {
        setTimeout(() => step(i + 1), lineDelayMs);
      } else {
        setTimeout(() => { if (!cancelled) onComplete(); }, tailMs);
      }
    }

    step(1);

    function skip(e: KeyboardEvent) {
      e.preventDefault();
      cancelled = true;
      onComplete();
    }
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", skip);
    };
  }, [lineDelayMs, tailMs, onComplete]);

  return (
    <div className={cn("font-mono text-sm text-text-muted p-6 flex flex-col gap-1", className)}>
      {LINES.slice(0, shown).map((line, i) => (
        <div key={i} className={i === shown - 1 ? "text-accent" : "text-text-muted"}>
          {line}
        </div>
      ))}
    </div>
  );
}
