import { Tree } from "@/components/Tree";
import { PINNED_LINKS } from "@/data/links";

interface LinksPaneProps {
  onOpenResume: () => void;
}

export function LinksPane({ onOpenResume }: LinksPaneProps) {
  return (
    <section className="p-3 bg-surface-1">
      <div className="text-accent text-xs tracking-widest mb-3 border-b border-accent inline-block pb-1">
        ★ LINKS
      </div>
      <Tree>
        {PINNED_LINKS.map((item, i) => {
          const isLast = i === PINNED_LINKS.length - 1;
          if (item.action === "open-resume") {
            return (
              <Tree.Item key={item.id} isLast={isLast} onClick={onOpenResume}>
                {item.label}
              </Tree.Item>
            );
          }
          return (
            <Tree.Item
              key={item.id}
              isLast={isLast}
              onClick={() => window.open(item.href, "_blank", "noopener")}
            >
              {item.label}
            </Tree.Item>
          );
        })}
      </Tree>
    </section>
  );
}
