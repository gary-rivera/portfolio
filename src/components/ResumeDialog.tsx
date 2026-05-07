import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { events } from "@/data/experience";
import { PINNED_LINKS } from "@/data/links";
import { Download } from "lucide-react";

interface ResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Keep milestones, impact entries, and achievements that map to a real employer.
// Drops the standalone bootcamp/internship line items for a tighter resume — adjust the predicate to taste.
const RESUME_EVENTS = events.filter((e) => e.category !== "achievement" || !!e.subtitle);

export function ResumeDialog({ open, onOpenChange }: ResumeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface-1 border border-border text-text font-mono max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogTitle className="text-accent text-lg">~/resume.pdf</DialogTitle>

        <section className="border-t border-border pt-4 space-y-1">
          <div className="text-text">gary rivera</div>
          <div className="text-text-muted text-sm">software engineer · ny</div>
          <div className="text-text-dim text-xs space-x-3 mt-2">
            {PINNED_LINKS.filter((l) => l.href && l.href !== "#").map((l) => (
              <a key={l.id} href={l.href} target="_blank" rel="noopener" className="hover:text-accent">
                {l.label}
              </a>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-4 mt-4">
          <h2 className="text-accent text-sm tracking-widest mb-2">// EXPERIENCE</h2>
          <ul className="space-y-3 text-sm">
            {RESUME_EVENTS.map((evt, i) => (
              <li key={i} className="grid grid-cols-[140px_1fr] gap-3">
                <span className="text-accent tabular-nums whitespace-nowrap">{evt.date}</span>
                <div>
                  <div className="text-text">
                    {evt.event}
                    {evt.subtitle && (
                      <>
                        <span className="text-text-dim"> @ </span>
                        <span className="text-text-muted">{evt.subtitle}</span>
                      </>
                    )}
                  </div>
                  {evt.description && <div className="text-text-muted text-xs mt-1">{evt.description}</div>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border pt-4 mt-4 flex items-center justify-between">
          <div className="text-text-dim text-xs">
            type <span className="text-accent">download-resume</span> in the prompt for PDF
          </div>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 text-sm text-accent border border-accent px-3 py-1 hover:bg-surface-2"
          >
            <Download size={14} /> download
          </a>
        </section>
      </DialogContent>
    </Dialog>
  );
}
