import type { SectionId } from "@/app/routes";
import { About } from "@/sections/About";

interface MainPanelProps {
  activeSection: SectionId;
  bootComplete: boolean;
}

export function MainPanel({ activeSection, bootComplete }: MainPanelProps) {
  return (
    <main className="flex-1 p-6 overflow-auto min-h-0">
      <div className="text-accent text-sm mb-6 border-b border-border pb-3">
        ~/<span className="text-text">{activeSection}</span>
      </div>
      {activeSection === "about" && <About ready={bootComplete} />}
      {activeSection === "experience" && <div className="text-text-muted text-sm">experience placeholder</div>}
      {activeSection === "projects" && <div className="text-text-muted text-sm">projects placeholder</div>}
      {activeSection === "contact" && <div className="text-text-muted text-sm">contact placeholder</div>}
    </main>
  );
}
