import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Sidebar } from "@/panels/Sidebar";
import { MainPanel } from "@/panels/MainPanel";
import { ActivityPane } from "@/panels/ActivityPane";
import { LinksPane } from "@/panels/LinksPane";
import { CommandPrompt } from "@/panels/CommandPrompt";
import { MobileSidebarDrawer } from "@/panels/MobileSidebarDrawer";
import { ResumeDialog } from "@/components/ResumeDialog";
import { BootSequence } from "@/components/BootSequence";

const BOOT_KEY = "tui:boot-complete";

export function App() {
  const { activeSection, setActiveSection } = useActiveSection();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [bootComplete, setBootComplete] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem(BOOT_KEY) === "1"
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (bootComplete) sessionStorage.setItem(BOOT_KEY, "1");
  }, [bootComplete]);

  if (!bootComplete) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-start">
        <BootSequence onComplete={() => setBootComplete(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-mono animate-[fade-in_300ms_ease-out]">
      {!isDesktop && (
        <header className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface-1">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="open menu"
            className="text-text-muted hover:text-accent"
          >
            <Menu size={18} />
          </button>
          <div className="text-text text-sm">
            <span className="text-text-dim">~/</span>gary-rivera
          </div>
        </header>
      )}

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-0">
        {isDesktop && (
          <Sidebar
            activeSection={activeSection}
            onSelectSection={setActiveSection}
            onOpenResume={() => setResumeOpen(true)}
          />
        )}

        <div className="flex flex-col min-h-0">
          <MainPanel activeSection={activeSection} bootComplete={bootComplete} />
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

      {!isDesktop && (
        <MobileSidebarDrawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenResume={() => setResumeOpen(true)}
        />
      )}

      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </div>
  );
}
