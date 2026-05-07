export interface LinkItem {
  id: string;
  label: string;
  /** Display value for the link (e.g. handle, email address). Optional. */
  value?: string;
  /** External URL. If absent, link is treated as an internal action. */
  href?: string;
  /** Internal action identifier (e.g. "open-resume"). */
  action?: "open-resume";
}

export const PINNED_LINKS: LinkItem[] = [
  { id: "resume", label: "resume.pdf", action: "open-resume" },
  { id: "github", label: "github", value: "@gary-rivera", href: "https://github.com/gary-rivera" },
  // TODO: replace LinkedIn URL with the user's real profile when supplied.
  { id: "linkedin", label: "linkedin", value: "in/<TBD>", href: "#" },
  { id: "email", label: "email", value: "gary.rivera@hyperfi.ai", href: "mailto:gary.rivera@hyperfi.ai" },
];
