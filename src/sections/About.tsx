import { TypingText } from "@/components/TypingText";
import { BlinkCursor } from "@/components/BlinkCursor";

interface AboutProps {
  /** When true, the typing animation may begin. */
  ready: boolean;
}

export function About({ ready }: AboutProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-text-dim text-xs tracking-widest">// PROFILE</div>
        <h1 className="text-2xl text-accent">
          {ready ? <TypingText text="gary r." charDelayMs={70} startDelayMs={100} /> : <span>&nbsp;</span>}
          <BlinkCursor className="ml-1" />
        </h1>
        <p className="text-text-muted text-sm">software engineer · ny</p>
      </div>

      <p className="text-text max-w-2xl leading-relaxed text-sm">
        Building thoughtful tools at the intersection of TUI ergonomics and the modern web.
        Currently shipping realtime infra and the occasional terminal interface.
      </p>

      <div className="space-y-2">
        <div className="text-text-dim text-xs tracking-widest">// CURRENTLY</div>
        <ul className="text-sm text-text-muted space-y-1">
          <li>→ shipping <span className="text-accent">snaily v0.4</span></li>
          <li>→ rebuilding portfolio in tui aesthetic</li>
        </ul>
      </div>
    </div>
  );
}
