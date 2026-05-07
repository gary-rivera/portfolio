import { Tree } from "@/components/Tree";

const CONTACT_ITEMS = [
  { label: "email", value: "gary.rivera@hyperfi.ai", href: "mailto:gary.rivera@hyperfi.ai" },
  { label: "github", value: "@gary-rivera", href: "https://github.com/gary-rivera" },
  { label: "linkedin", value: "in/<TBD>", href: "#" /* TODO: replace with real LinkedIn URL */ },
];

export function Contact() {
  return (
    <div className="space-y-6">
      <div className="text-text-dim text-xs tracking-widest">// CONTACT</div>
      <Tree>
        {CONTACT_ITEMS.map((item, i) => (
          <Tree.Item
            key={item.label}
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
