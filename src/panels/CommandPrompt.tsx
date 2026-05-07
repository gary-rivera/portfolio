import { useState, useRef, useEffect } from "react";
import { Command } from "cmdk";
import { BlinkCursor } from "@/components/BlinkCursor";
import { buildCommands, type CommandContext } from "@/lib/commands";

type CommandPromptProps = CommandContext;

export function CommandPrompt(ctx: CommandPromptProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = buildCommands({
    ...ctx,
    clearInput: () => setInput(""),
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function runById(id: string) {
    const cmd = commands.find((c) => c.id === id);
    if (cmd) {
      cmd.run();
      setOpen(false);
      setInput("");
    }
  }

  return (
    <footer className="sticky bottom-0 border-t border-border bg-surface-1 z-40">
      <Command label="command palette" className="relative">
        {open && (
          <Command.List className="absolute bottom-full left-0 right-0 max-h-72 overflow-y-auto bg-surface-1 border-t border-border">
            <Command.Empty className="px-4 py-2 text-text-dim text-sm">no commands match</Command.Empty>
            {(["navigate", "action"] as const).map((group) => (
              <Command.Group
                key={group}
                heading={group}
                className="px-2 py-1 text-text-dim text-[10px] tracking-widest [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1"
              >
                {commands
                  .filter((c) => c.group === group)
                  .map((c) => (
                    <Command.Item
                      key={c.id}
                      value={`${c.id} ${c.label}`}
                      onSelect={() => runById(c.id)}
                      className="px-3 py-1.5 text-sm text-text data-[selected=true]:bg-surface-2 data-[selected=true]:text-accent flex items-center justify-between cursor-pointer"
                    >
                      <span>{c.label}</span>
                      {c.hint && <span className="text-text-dim text-xs">{c.hint}</span>}
                    </Command.Item>
                  ))}
              </Command.Group>
            ))}
          </Command.List>
        )}
        <div className="flex items-center gap-2 px-4 py-2 text-sm">
          <span className="text-accent">→</span>
          <Command.Input
            ref={inputRef}
            value={input}
            onValueChange={setInput}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 100)}
            placeholder="type a command (try: experience, projects, resume, help)"
            className="flex-1 bg-transparent outline-none text-text placeholder:text-text-dim"
          />
          <BlinkCursor variant="underscore" className="self-end" />
          <span className="text-text-dim text-xs ml-2">⌘K</span>
        </div>
      </Command>
    </footer>
  );
}
