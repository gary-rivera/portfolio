import { Tree } from "@/components/Tree";
import { SECTIONS, type SectionId } from "@/app/routes";
import { PINNED_LINKS } from "@/data/links";

interface SidebarProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onOpenResume: () => void;
}

const STACK = ["react", "typescript", "vite", "node", "tailwind"];

export function Sidebar({ activeSection, onSelectSection, onOpenResume }: SidebarProps) {
  return (
    <aside className="border-b md:border-b-0 md:border-r border-border bg-surface-1 p-4 overflow-y-auto">
      <div className="text-text mb-1">
        <span className="text-text-dim">~/</span>gary-rivera
      </div>

      <Tree className="mb-6">
        {SECTIONS.map((id, i) => (
          <Tree.Item
            key={id}
            isLast={i === SECTIONS.length - 1}
            active={id === activeSection}
            onClick={() => onSelectSection(id)}
          >
            {id}
          </Tree.Item>
        ))}
      </Tree>

      <div className="text-accent text-xs tracking-widest mb-2">★ PINNED</div>
      <Tree className="mb-6">
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

      <div className="text-accent text-xs tracking-widest mb-2">⊞ STACK</div>
      <Tree>
        {STACK.map((s, i) => (
          <Tree.Item key={s} isLast={i === STACK.length - 1}>
            {s}
          </Tree.Item>
        ))}
      </Tree>
    </aside>
  );
}
