import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sidebar } from "./Sidebar";
import type { SectionId } from "@/app/routes";

interface MobileSidebarDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onOpenResume: () => void;
}

export function MobileSidebarDrawer({
  open,
  onOpenChange,
  activeSection,
  onSelectSection,
  onOpenResume,
}: MobileSidebarDrawerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="fixed inset-y-0 left-0 right-auto h-full max-w-[280px] w-[80vw] bg-surface-1 border-r border-border p-0 translate-x-0 translate-y-0 top-0 left-0 rounded-none"
      >
        <Sidebar
          activeSection={activeSection}
          onSelectSection={(id) => {
            onSelectSection(id);
            onOpenChange(false);
          }}
          onOpenResume={() => {
            onOpenResume();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
