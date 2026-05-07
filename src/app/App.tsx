import { useActiveSection } from "@/hooks/useActiveSection";

export function App() {
  const { activeSection } = useActiveSection();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-mono">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-0">
        <aside className="border-b md:border-b-0 md:border-r border-border bg-surface-1 p-4">
          <div className="text-text-dim text-xs tracking-widest">SIDEBAR</div>
        </aside>

        <div className="flex flex-col min-h-0">
          <main className="flex-1 p-4 overflow-auto">
            <div className="text-accent text-sm">~/{activeSection}</div>
            <div className="text-text-muted text-xs mt-2">MAIN PANEL</div>
          </main>

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
    </div>
  );
}
