import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
        className="fixed inset-y-0 left-0 right-auto h-full max-w-[280px] w-[80vw] bg-surface-1 border-r border-border p-0 rounded-none top-0 transition-transform duration-200 data-[state=open]:animate-none data-[state=closed]:animate-none data-[state=closed]:-translate-x-full"
      >
        <DialogTitle className="sr-only">Navigation</DialogTitle>
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
