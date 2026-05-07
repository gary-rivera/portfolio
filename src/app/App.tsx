import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Sidebar } from "@/panels/Sidebar";
import { MainPanel } from "@/panels/MainPanel";
import { ActivityPane } from "@/panels/ActivityPane";
import { LinksPane } from "@/panels/LinksPane";
import { CommandPrompt } from "@/panels/CommandPrompt";

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
            <ActivityPane />
            <LinksPane onOpenResume={() => setResumeOpen(true)} />
          </div>
        </div>
      </div>

      <CommandPrompt
        setActiveSection={setActiveSection}
        openResume={() => setResumeOpen(true)}
        openExternal={(href) => window.open(href, "_blank", "noopener")}
        clearInput={() => {}}
      />

      {resumeOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setResumeOpen(false)}>
          <div className="bg-surface-1 border border-border p-6 text-text">resume placeholder</div>
        </div>
      )}
    </div>
  );
}
