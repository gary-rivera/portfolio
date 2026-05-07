import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Sidebar } from "@/panels/Sidebar";
import { MainPanel } from "@/panels/MainPanel";

export function App() {
  const { activeSection, setActiveSection } = useActiveSection();
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-mono">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-0">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenResume={() => setResumeOpen(true)}
        />

        <div className="flex flex-col min-h-0">
          <MainPanel activeSection={activeSection} bootComplete={true} />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            <section className="p-3 border-b md:border-b-0 md:border-r border-border bg-surface-1">
              <div className="text-text-dim text-xs tracking-widest">ACTIVITY</div>
            </section>
            <section className="p-3 bg-surface-1">
              <div className="text-text-dim text-xs tracking-widest">LINKS</div>
            </section>
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 border-t border-border bg-surface-1 px-4 py-2 text-sm">
        <span className="text-accent">→</span>{" "}
        <span className="text-text-muted">command prompt placeholder</span>
      </footer>

      {resumeOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setResumeOpen(false)}>
          <div className="bg-surface-1 border border-border p-6 text-text">resume placeholder</div>
        </div>
      )}
    </div>
  );
}
