import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface TypingTextProps {
  text: string;
  charDelayMs?: number;
  startDelayMs?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypingText({
  text,
  charDelayMs = 60,
  startDelayMs = 0,
  onComplete,
  className,
}: TypingTextProps) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    let typingId: ReturnType<typeof setInterval> | null = null;

    const startId = setTimeout(() => {
      typingId = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          if (typingId) clearInterval(typingId);
          onComplete?.();
        }
      }, charDelayMs);
    }, startDelayMs);

    return () => {
      clearTimeout(startId);
      if (typingId) clearInterval(typingId);
    };
  }, [text, charDelayMs, startDelayMs, onComplete]);

  return (
    <span data-testid="typing-text" className={cn(className)}>
      {shown}
    </span>
  );
}
