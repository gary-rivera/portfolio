import type { SectionId } from "@/app/routes";
import { ProjectCatalog, projectCatalogKeys } from "@/data/projects";
import { PINNED_LINKS } from "@/data/links";

export interface CommandContext {
  setActiveSection: (id: SectionId) => void;
  openResume: () => void;
  openExternal: (href: string) => void;
  clearInput: () => void;
}

export interface Command {
  id: string;
  label: string;
  hint?: string;
  group: "navigate" | "action" | "easter-egg";
  run: () => void;
}

export function buildCommands(ctx: CommandContext): Command[] {
  const navigate: Command[] = (
    [
      { id: "about", label: "about", hint: "go to /about" },
      { id: "experience", label: "experience", hint: "go to /experience" },
      { id: "projects", label: "projects", hint: "go to /projects" },
      { id: "contact", label: "contact", hint: "go to /contact" },
    ] as const
  ).map((c) => ({
    ...c,
    group: "navigate" as const,
    run: () => ctx.setActiveSection(c.id as SectionId),
  }));

  navigate.push({
    id: "resume",
    label: "resume",
    hint: "open resume dialog",
    group: "navigate",
    run: () => ctx.openResume(),
  });

  navigate.push({
    id: "clear",
    label: "clear",
    hint: "clear input",
    group: "navigate",
    run: () => ctx.clearInput(),
  });

  const actions: Command[] = [];

  const externalLinks = PINNED_LINKS.filter((l) => l.href && l.href !== "#");
  for (const link of externalLinks) {
    actions.push({
      id: `open-${link.id}`,
      label: `open ${link.label}`,
      hint: link.href,
      group: "action",
      run: () => ctx.openExternal(link.href!),
    });
  }

  for (const key of projectCatalogKeys) {
    const p = ProjectCatalog[key];
    const href = p.links.deployment ?? p.links.repo;
    if (!href) continue;
    actions.push({
      id: `view-${key}`,
      label: `view ${key}`,
      hint: href,
      group: "action",
      run: () => ctx.openExternal(href),
    });
  }

  actions.push({
    id: "download-resume",
    label: "download resume",
    hint: "/resume.pdf",
    group: "action",
    run: () => ctx.openExternal("/resume.pdf"),
  });

  // Slot for easter-egg commands. Add new entries to `easterEggs` later.
  const easterEggs: Command[] = [];

  return [...navigate, ...actions, ...easterEggs];
}
