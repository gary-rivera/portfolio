import { events, type CareerEvent } from "@/data/experience";
import { Tree } from "@/components/Tree";
import { cn } from "@/lib/cn";

function categoryGlyph(category: CareerEvent["category"]): string {
  if (category === "milestone") return "★";
  if (category === "achievement") return "◆";
  return "→"; // impact
}

export function Experience() {
  return (
    <div className="space-y-6">
      <div className="text-text-dim text-xs tracking-widest">// CAREER LOG · {events.length} entries</div>
      <Tree>
        {events.map((evt, i) => {
          const isLast = i === events.length - 1;
          const headline = evt.subtitle
            ? `${evt.event} · ${evt.subtitle}`
            : evt.event;
          return (
            <Tree.Item key={`${evt.event}-${i}`} isLast={isLast}>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-accent tabular-nums whitespace-nowrap">{evt.date}</span>
                  <span className={cn("text-xs", evt.category === "milestone" ? "text-pip" : "text-text-dim")}>
                    {categoryGlyph(evt.category)}
                  </span>
                  <span className="text-text">{headline}</span>
                  {evt.companyName && evt.companyName !== evt.subtitle && (
                    <span className="text-text-muted text-xs">@ {evt.companyName}</span>
                  )}
                </div>
                {evt.description && (
                  <div className="text-text-muted text-xs ml-6 leading-relaxed">└ {evt.description}</div>
                )}
              </div>
            </Tree.Item>
          );
        })}
      </Tree>
    </div>
  );
}
