export const SECTIONS = ["about", "experience", "projects", "contact"] as const;
export type SectionId = typeof SECTIONS[number];
export const DEFAULT_SECTION: SectionId = "about";

export function isSectionId(value: unknown): value is SectionId {
  return typeof value === "string" && (SECTIONS as readonly string[]).includes(value);
}
