import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface TreeProps {
  children: ReactNode;
  className?: string;
}

interface TreeItemProps {
  children: ReactNode;
  isLast?: boolean;
  active?: boolean;
  indent?: number;
  onClick?: () => void;
  className?: string;
}

function Tree({ children, className }: TreeProps) {
  return <ul className={cn("font-mono text-sm leading-6", className)}>{children}</ul>;
}

function TreeItem({ children, isLast = false, active = false, indent = 0, onClick, className }: TreeItemProps) {
  const glyph = isLast ? "└" : "├";
  const pad = " ".repeat(indent * 2);
  return (
    <li
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      className={cn(
        "flex items-center gap-1 cursor-default select-none",
        active
          ? "text-accent border-l-2 border-accent bg-surface-1/40 -ml-[2px] pl-2"
          : "text-text-muted hover:text-text",
        onClick && "cursor-pointer",
        className
      )}
    >
      <span className="text-text-dim whitespace-pre">{pad}{glyph}</span>
      <span>{children}</span>
    </li>
  );
}

Tree.Item = TreeItem;
export { Tree };
