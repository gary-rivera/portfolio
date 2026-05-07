import { Tree } from "@/components/Tree";
import { PINNED_LINKS } from "@/data/links";

const CONTACT_ITEMS = PINNED_LINKS.filter((l) => l.href);

export function Contact() {
  return (
    <div className="space-y-6">
      <div className="text-text-dim text-xs tracking-widest">// CONTACT</div>
      <Tree>
        {CONTACT_ITEMS.map((item, i) => (
          <Tree.Item
            key={item.id}
            isLast={i === CONTACT_ITEMS.length - 1}
            onClick={() => window.open(item.href, "_blank", "noopener")}
          >
            <span className="text-text-muted">{item.label}</span>
            <span className="text-text-dim mx-2">·</span>
            <span className="text-accent">{item.value}</span>
          </Tree.Item>
        ))}
      </Tree>
      <p className="text-text-muted text-sm max-w-xl leading-relaxed">
        Best way to reach me is email. I read everything; I reply to most.
      </p>
    </div>
  );
}
