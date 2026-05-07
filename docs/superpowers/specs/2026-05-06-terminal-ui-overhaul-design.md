# Terminal-UI Overhaul — Design Spec

**Date:** 2026-05-06
**Branch:** `overhaul/terminal-ui` (off `main`)
**Status:** Approved for implementation planning

## Goal

Replace the current portfolio's Chakra-based, narrative single-page layout with a multi-panel TUI-style interface inspired by terminal apps (Posting, Lazygit, Atuin). Keep all current content (hero, experience, projects, resume, contact links) but reframe the entire experience around a terminal aesthetic with a command palette as a secondary interaction model.

## Non-goals

- No CMS integration. Content stays in `src/data/`.
- No light mode. Dark only.
- No client-side router. URL-hash navigation only.
- No analytics or tracking.
- Easter-egg commands deferred — registry slot exists, no content shipped initially.
- GitHub API integration (existing `useGitHub`/Octokit) not wired into the UI in this overhaul.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript (upgrade from 18 during rebuild) |
| Bundler | Vite (kept) |
| Styling | Tailwind v4 (CSS-first config with `@theme`) |
| Component library | shadcn/ui (manual install, terminal-themed overrides) |
| Command palette | `cmdk` via shadcn `<Command>` |
| Animation | Framer Motion (kept; used only for typing effect + boot sequence) |
| Font | Geist Mono Variable (via `@fontsource-variable/geist-mono`) |
| Utilities (kept) | `dayjs`, `react-markdown` (resume) |
| Icons | `lucide-react` (default for generic UI). `react-icons` kept only for brand marks Lucide doesn't ship (e.g. specific tech logos). |
| Removed | Chakra UI, Emotion, Tippy.js, `next-themes`, SWR |

## Visual identity

### Palette — "Teal Curfew"

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#0A1014` | Page background |
| `--color-surface-1` | `#101820` | Panel backgrounds, elevated surfaces |
| `--color-surface-2` | `#16222C` | Slightly higher elevation, hover states |
| `--color-border` | `#243240` | Dividers, panel borders |
| `--color-text` | `#DCE7EE` | Primary text |
| `--color-text-muted` | `#7E8E9A` | Secondary text |
| `--color-text-dim` | `#4A5764` | Low-emphasis labels |
| `--color-accent` | `#3FE0C8` | Hero accent — active tab underline, selected tree item, prompt arrow |
| `--color-accent-muted` | `#1A6A60` | Hover/secondary accent, hatch-bar shadow stripe |
| `--color-pip` | `#FF4D88` | Status pips only — sparing use |

### Typography

- **Geist Mono Variable** everywhere. No mixed sans/mono.
- Body size 12–13px / line-height 1.55–1.6.
- Headings differ by weight (500/600) and color, not by family.
- Selection color: `var(--color-accent-muted)`.

### Chrome and texture

- **No fake macOS window chrome.** No traffic-light dots, no fake title bar.
- **No background texture.** Solid `var(--color-bg)`. The current 4x4 subgrid is dropped.
- Square corners — `--radius-panel: 4px`, `--radius-control: 2px`.

## Architecture

### Directory layout

```
src/
├── app/
│   ├── App.tsx                 # 3-zone grid shell (sidebar | main | footer panes)
│   ├── boot-state.tsx          # Tracks "boot complete" (gates the typing effect)
│   └── routes.ts               # Section IDs: 'about' | 'experience' | 'projects' | 'contact'
├── panels/
│   ├── Sidebar.tsx             # Panel 1: nav tree + pinned + stack
│   ├── MainPanel.tsx           # Panel 2: routes by active section
│   ├── ActivityPane.tsx        # Panel 3 (bottom-left)
│   ├── LinksPane.tsx           # Panel 4 (bottom-right)
│   └── CommandPrompt.tsx       # Panel 5: cmdk-driven, footer
├── sections/
│   ├── About.tsx
│   ├── Experience.tsx          # Timeline view
│   ├── Projects.tsx            # Card list
│   └── Contact.tsx
├── components/
│   ├── ui/                     # shadcn primitives (Tooltip, Dialog, Command, Tabs, ScrollArea)
│   ├── Tree.tsx                # ASCII tree primitive (├ └ │ ─ glyphs)
│   ├── HatchBar.tsx            # Diagonal-hatch progress bar
│   ├── TypingText.tsx          # Ports current NameTypingEffect reducer
│   ├── BlinkCursor.tsx
│   ├── BootSequence.tsx
│   └── ResumeDialog.tsx
├── data/                       # Carried over from current project
│   ├── projects.ts
│   ├── experience.ts
│   └── employers.ts
├── hooks/
│   ├── useActiveSection.ts     # URL hash sync (#experience etc.)
│   ├── useCommandPalette.ts    # Registers commands, dispatches actions
│   └── useMediaQuery.ts
├── lib/
│   ├── commands.ts             # Command registry
│   └── cn.ts                   # shadcn classname helper
├── styles/
│   └── globals.css             # Tailwind v4 entrypoint + @theme tokens
├── assets/                     # Carried over (project logos)
└── main.tsx
```

### State model

- `activeSection: 'about' | 'experience' | 'projects' | 'contact'` — driven by URL hash. Single source of truth. Set via clicks or commands.
- `bootComplete: boolean` — local state in `App.tsx`. Flips after the boot sequence finishes (~600ms) or when user presses any key/`Esc`. Tracked in `sessionStorage` so it only runs once per session.
- Command palette open/closed — local state in `<CommandPrompt>`. Opens on focus or `⌘K` (`Ctrl+K` on Windows).
- Resume dialog open/closed — local state, opened by clicking pinned `resume.pdf` or running `resume` command.

No Context, no Zustand. Props down, hash up.

### Routing

Tiny custom hook (`useActiveSection`) syncs URL hash with React state. No router library. Supports deep-links (`/#experience`, `/#projects`) and back/forward navigation.

## Layout

### Desktop (≥ 768px) — 3-zone grid

```
┌─────────────────┬─────────────────────────────────────┐
│                 │                                     │
│  Sidebar        │  Main panel                         │
│  (Panel 1)      │  (Panel 2)                          │
│                 │                                     │
│  ★ Pinned       │  ~/<active-section>                 │
│  ⊞ Stack        │                                     │
│                 │  [section content]                  │
│                 │                                     │
│                 ├─────────────────┬───────────────────┤
│                 │  Activity       │  Links            │
│                 │  (Panel 3)      │  (Panel 4)        │
├─────────────────┴─────────────────┴───────────────────┤
│  → command palette prompt                         ⌘K  │
└───────────────────────────────────────────────────────┘
```

- Sidebar: `240px` fixed.
- Main panel: fills remaining width, top of right column.
- Bottom panes: split 50/50 below main panel.
- Command prompt: full width, sticky at viewport bottom.

### Mobile (< 768px) — vertical stack

```
┌────────────────────┐
│ ☰  ~/gary-rivera   │   thin header
├────────────────────┤
│  [main panel]      │
├────────────────────┤
│  ★ activity        │
├────────────────────┤
│  ★ links           │
├────────────────────┤
│ → command      ⌘K  │   sticky bottom
└────────────────────┘
```

- Sidebar becomes a left drawer (Radix `<Dialog>` styled as a sheet), opened by the `☰` button.
- Panels stack vertically.
- Command prompt stays sticky at the bottom; tap to focus.
- Boot sequence runs at compressed timing (~400ms).

Single breakpoint: Tailwind's `md:` (768px).

## Components — responsibilities

### Panels

**`<Sidebar>`** — props: `activeSection`. Three logical groups:
- `nav`: about, experience, projects, contact (each links a section)
- `pinned`: resume.pdf, github, linkedin, email (each opens external link or dialog)
- `stack`: react, ts, vite, etc. (visual-only, not clickable)

Each line is a `<Tree.Item>` rendering `├` `└` `│` glyphs. Active item: teal left-border + faint surface-1 tint. Click dispatches `setActiveSection(...)` via the URL hash.

**`<MainPanel>`** — props: `activeSection`. Renders the matching section component from `src/sections/`. Wrapped in a thin tab bar that only appears for sections with sub-views (Experience: `timeline | cards`). Header shows `~/<section>` in teal.

**`<ActivityPane>`** — Renders 2-3 `<HatchBar>` rows for "currently shipping" projects. Labels pulled from `data/projects.ts`. Progress % derived from each project's `commits` field, normalized against the max commits in the dataset. No live data fetching in v1.

**`<LinksPane>`** — Renders contact/external links as a folder-tree-style list. Same data source as Sidebar's `pinned` group (single source).

**`<CommandPrompt>`** — Footer, full-width, always visible. `→` prompt + input + blinking cursor. Backed by `cmdk` (via shadcn `<Command>`). `⌘K` opens the suggestion list above the prompt. Suggestions filtered by typed text. Dispatches commands from the registry.

### Sections

- `<About>` — bio block. Mostly static text + the typing effect for the name.
- `<Experience>` — timeline view of `data/experience.ts`. Terminal-styled (tree-character indents, no bubbles). Sub-tab option for `cards` view (alternate layout).
- `<Projects>` — card list of `data/projects.ts`. Each project renders as a bordered "file" with name, description, tags, links (repo/npm/deploy). Restyled to terminal aesthetic.
- `<Contact>` — list of contact methods. Mostly redundant with `<LinksPane>` — uses the same data.

### Primitives

- `<Tree>` + `<Tree.Item>` — composes ASCII tree characters from item position (first/middle/last/has-children). Real Unicode glyphs, no SVG.
- `<HatchBar>` — diagonal-hatch progress bar via `repeating-linear-gradient`. Pure CSS.
- `<TypingText text="...">` — ports current `NameTypingEffect` reducer. Variable per-character speed, supports delete + retype sequences.
- `<BlinkCursor>` — solid 600ms / blank 400ms via `@keyframes`. JS-free.
- `<BootSequence>` — renders 3-4 lines top-to-bottom, ~150ms apart. On completion, fades and sets `bootComplete=true`. `Esc` or any key skips.
- `<ResumeDialog>` — shadcn `<Dialog>` (Radix portal). Renders resume content via `react-markdown`. Triggered by `pinned > resume.pdf` click or `resume` command.

## Command registry

```ts
type Command = {
  id: string;
  label: string;
  hint?: string;
  group: 'navigate' | 'action' | 'easter-egg';
  run: (ctx: CommandContext) => void;
};

type CommandContext = {
  setActiveSection: (id: SectionId) => void;
  openResume: () => void;
};
```

Initial commands:

**navigate:**
- `about`, `experience`, `projects`, `contact` — change active section
- `resume` — open resume dialog
- `clear` — clear command palette input
- `help` — show command list

**action:**
- `download-resume` — triggers resume PDF download
- `email` — `mailto:` link
- `open-github` — opens external profile
- `open-linkedin` — opens external profile
- `view <project-slug>` — dynamically generated from `data/projects.ts`; opens project's primary external link

**easter-egg:** empty for v1. Slot reserved with `// TODO: easter eggs` comment in `lib/commands.ts`. Adding `whoami`, `ls`, `sudo hire-me`, `vim` later is a one-file change.

## Motion (Quiet)

| Element | Behavior |
|---|---|
| Boot sequence | 3 lines, ~150ms apart. ~600ms total. Fades on completion. Skippable. Once per session via `sessionStorage`. |
| Typing effect (name) | Plays after `bootComplete`. Ports existing reducer logic. |
| Cursor blink | Persistent. CSS `@keyframes`, no JS. |
| Section change | Optional 100ms opacity fade on main panel only. |
| Hover states | Color-only, ~120ms ease. No transforms. |
| Sidebar item click | Color update only. |
| Command palette | `cmdk` default behavior. No overrides. |
| Resume dialog | shadcn `<Dialog>` default. No overrides. |

**Note:** The original spec said "Framer Motion used for the typing effect and boot sequence." During plan-writing this was reconsidered — neither component genuinely needs Framer (`setTimeout` + CSS keyframes cover both cases), so the implementation plan removes Framer Motion entirely. This trims a sizable dependency without affecting the final visual.

## Styling system

### Tailwind v4 configuration

`src/styles/globals.css`:

```css
@import "tailwindcss";
@import "@fontsource-variable/geist-mono";

@theme {
  --color-bg: #0A1014;
  --color-surface-1: #101820;
  --color-surface-2: #16222C;
  --color-border: #243240;
  --color-text: #DCE7EE;
  --color-text-muted: #7E8E9A;
  --color-text-dim: #4A5764;
  --color-accent: #3FE0C8;
  --color-accent-muted: #1A6A60;
  --color-pip: #FF4D88;

  --font-mono: "Geist Mono Variable", ui-monospace, SFMono-Regular, Menlo, monospace;

  --radius-panel: 4px;
  --radius-control: 2px;
  --container-max: 1440px;
}

html, body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-mono);
}

*, *::before, *::after { border-color: var(--color-border); }

::selection { background: var(--color-accent-muted); color: var(--color-text); }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-thumb { background: var(--color-surface-2); }
::-webkit-scrollbar-thumb:hover { background: var(--color-border); }
```

Tokens auto-flow into Tailwind utilities (`bg-bg`, `text-accent`, `border-border`, `font-mono`).

### shadcn integration

`components.json`:
- `tailwind.cssVariables: true`
- `tailwind.baseColor: slate`
- `style: "new-york"`

Map shadcn semantic tokens to terminal tokens via additional `:root` CSS variables (`--background: var(--color-bg)`, `--primary: var(--color-accent)`, etc.) so primitives pick up the palette without per-component overrides. Strip rounded corners (`rounded-none` on most), remove shadows, swap focus-ring to teal underline.

### Component pattern

Tailwind classes directly. No component-level CSS files. Variants via `cva`.

```tsx
<Tree.Item active={isActive} indent={1}>about</Tree.Item>
// internally:
// <li className={cn(
//   "font-mono text-sm",
//   active
//     ? "text-accent border-l-2 border-accent bg-surface-1/40"
//     : "text-text-muted hover:text-text"
// )}>
```

## Migration sequence (build order on `overhaul/terminal-ui`)

1. Cut branch from `main`. Wipe `src/components/`, `src/styles/`, `src/context/`, `App.tsx`, `main.tsx`. Keep `src/data/`, `src/assets/`, `src/hooks/useGitHub.ts`.
2. Remove Chakra/Emotion/Tippy/`next-themes`/SWR from `package.json`. Add Tailwind v4, shadcn deps, `cmdk`, `@fontsource-variable/geist-mono`. Upgrade React to 19.
3. Set up `globals.css` with `@theme` block + shadcn variable mappings. Verify Tailwind builds.
4. Init shadcn (`npx shadcn@latest init`). Install `Dialog`, `Tooltip`, `Tabs`, `Command`, `ScrollArea`.
5. Build layout shell (`App.tsx` + 3-zone grid) with placeholders. Verify dark bg + Geist Mono renders.
6. Build primitives: `<Tree>`, `<HatchBar>`, `<TypingText>`, `<BlinkCursor>`. Throw them into App temporarily for visual QA.
7. Build `<Sidebar>` with real data wired up.
8. Build `<MainPanel>` + `<About>` section.
9. Port `<Experience>` and `<Projects>` sections (most content work).
10. Build `<ActivityPane>` + `<LinksPane>`.
11. Build `<CommandPrompt>` + command registry. Wire `⌘K`. Test all nav/action commands.
12. Build `<ResumeDialog>`. Port resume content.
13. Boot sequence + section-change fade.
14. Mobile responsive pass — verify drawer, stack layout, prompt stickiness.
15. Polish: focus rings, scrollbar, selection styling, hover states.
16. Lint + typecheck clean. Final visual QA at 1440px / 1024px / 768px / 375px.
17. Squash to a small set of commits, open PR (draft until ready).

## Open questions / future work

- **Easter-egg commands** — registry slot exists; content TBD in a follow-up.
- **GitHub API integration** — `useGitHub`/Octokit kept in repo but not wired. Could surface live commit data in `<ActivityPane>` later. (Octokit dep is removed during cleanup; re-add when wiring.)
- **Light mode** — explicitly out of scope. Could be added later but would dilute the aesthetic.
- **Analytics** — none planned.
- **LinkedIn URL** — not in any existing data file. User will provide; fall back to a `#` placeholder if not supplied at implementation time.

---

# Context for fresh agents

This section bundles every decision, alternative considered, and concrete value referenced during the brainstorming session — so a fresh agent can implement the plan without rerunning discovery. Read this end-to-end before starting any task.

## Decision log (the 13 brainstorming questions)

| # | Question | Decision | Why |
|---|---|---|---|
| Q1 | Interaction model: aesthetic-only, hybrid, or full TUI sim? | **B — Hybrid** (terminal aesthetic + light interactivity via command palette; sections still clickable) | Full TUI alienates mobile/casual visitors; aesthetic-only would miss the "wow" of a working command palette. Hybrid is the sweet spot. |
| Q2 | Layout: narrative single-column reskinned, or multi-panel TUI? | **Multi-panel TUI** | The whole point was the inspo's panel layout; reskinning a single column wouldn't match the reference. |
| Q3 | What goes in each panel? | 5-panel structure approved as proposed (Sidebar / Main / Activity / Links / Prompt) | "Sure that'll work for now." |
| Q4 | HeroUI was originally proposed — is it the right tool? | **No — pivoted to Tailwind v4 + shadcn** | HeroUI's polished, opinionated components (rounded, shadowed, smooth easing) actively fight a terminal aesthetic. shadcn copies components into the project so we own and override them; built on Radix for accessibility. |
| Q5 | Color palette | **Teal Curfew** (cyberpunk family, restrained) — selected from 10 variants generated by 5 parallel sub-agents | Cool teal hero on slate-blue with hot-pink as a single-pip accent. Reads sophisticated-technical, not vaporwave. |
| Q6 | Light mode? | **Dark only** | Terminal aesthetic is naturally dark; light mode would dilute the personality. Less work, fewer compromises. |
| Q7 | Window chrome (fake macOS title bar)? | **No chrome** | User picked maximum minimalism. The chrome was a costume; without it, content does the work. |
| Q8 | Background texture (subtle subgrid)? | **Drop entirely** — solid `#0A1014` | Same minimalism logic. The teal accent and tree characters carry the aesthetic alone. |
| Q9 | Typography: all-mono or mixed (mono headings + sans body)? | **All monospace** | Content is short (bios, blurbs, timeline entries). All-mono at 1.55–1.65 line-height reads fine and preserves "TUI app" purity. |
| Q10 | Mono font (4 finalists shown side-by-side) | **Geist Mono** | Sharper and more modern than JetBrains Mono; reads as "designer-engineer". Free, ships via fontsource. |
| Q11 | Motion language | **A — Quiet** | Typing effect for name only; otherwise near-instant. Fade-in on mount, cursor blink, no panel transitions. Most refined. (Originally spec'd Framer for typing/boot; removed during plan-writing — `setTimeout` + CSS handle it.) |
| Q12 | What does the command prompt do? | **B — Navigation + actions** (with explicit slot for easter eggs in the registry, content deferred) | `experience`, `projects`, `resume`, `download-resume`, `email`, `open-github`, `view <project-slug>`, `clear`, `help`. Easter eggs (`whoami`, `ls`, `sudo hire-me`) intentionally deferred — registry is already structured to accept them. |
| Q13 | Mobile (<768px)? | **A — Stack** | Sidebar collapses to a hamburger drawer (Radix Dialog as left sheet); panels stack vertically; prompt stays sticky at the bottom. Single breakpoint at Tailwind's `md:` (768px). |
| Migration | Greenfield vs strangler vs wipe-on-main | **A — Greenfield rebuild on `overhaul/terminal-ui` branch** | Codebase is small (~17 components). Aesthetic is fundamentally different (Chakra → Tailwind, narrative → TUI, blue/beige → teal/black). Incremental migration would mean weeks of running two style systems with theme conflicts. Branch-based keeps `main` shippable. |

## Alternatives considered (so you don't re-explore)

### Color palettes — 10 variants across 5 families (winner: Teal Curfew)

| Family | V1 | V2 |
|---|---|---|
| Refined cool/blue | Abyssal Signal — `#06101A` / `#33D6E0` (deep teal-black, piercing cyan) | Glacial Steel — `#10141A` / `#7FB7E8` (tungsten graphite, frost-blue) |
| Code-editor-inspired | Tokyo Night, dialed — `#16161e` / `#7dcfff` | Everforest, dialed — `#232a2e` / `#a7c080` |
| Phosphor / vintage CRT | Phosphor Green, modernized — `#0A1410` / `#7CFF9A` | Amber 5151, dusk — `#161009` / `#FFB347` |
| **Cyberpunk (restrained)** | Magenta Curfew — `#0E0A14` / `#E6308A` | **Teal Curfew (winner)** — `#0A1014` / `#3FE0C8` |
| Muted / editorial | Graphite + Rust — `#14130F` / `#B5613A` | Slate + Sage — `#101214` / `#8FA68A` |

### Monospace fonts — 4 finalists (winner: Geist Mono)

| Font | Personality | Status |
|---|---|---|
| JetBrains Mono | Geometric, IDE-familiar default | Considered |
| **Geist Mono** | Sharp, modern, designer-engineer | **Winner** |
| IBM Plex Mono | Humanist, slightly warmer letterforms | Considered |
| Commit Mono | Designed for prose-in-monospace readability | Considered |

### Layout shape — 2 candidates

- **A. Narrative reskin** — current single-column shape with terminal styling. Mobile-friendly out of the box. *Rejected.*
- **B. Multi-panel TUI** — sidebar tree + main view + footer panes (matches inspo). *Selected.*

### Component-library / UI-stack alternatives

| Option | Outcome | Rationale |
|---|---|---|
| HeroUI (originally proposed) | **Rejected** | Polished/opinionated for SaaS. Would override 80% of styling for terminal aesthetic. Heavy bundle. |
| HeroUI + heavy override | Rejected | Same friction; pays bundle cost without benefit. |
| Tailwind + Radix UI primitives | Considered (recommended initially) | Unstyled accessible primitives + full Tailwind control. |
| Tailwind + react-aria-components | Considered | Same idea as Radix; Adobe's library; slightly more verbose. |
| **Tailwind v4 + shadcn/ui** | **Selected** | shadcn copies Radix-based components into the project (no library lock-in), designed to be aggressively restyled, ships with cmdk + cva + tailwind-merge integration. |

### Tailwind v3 vs v4

- **Tailwind v4** selected. CSS-first config via `@theme` directive (no separate `tailwind.config.ts`), faster build, native CSS variables map cleanly to shadcn's `--background` / `--foreground` etc.

### Migration approach — 3 candidates

- **A. Greenfield rebuild on a new branch** — *Selected.*
- **B. Strangler / incremental migration** — Rejected. Two style systems running simultaneously for weeks; the existing Framer-Motion stagger in App.tsx is tightly coupled and would resist incremental work.
- **C. Wipe + rebuild on `main`** — Rejected. Site broken in between; bad for a portfolio.

## Library decisions and motivations (concise)

| Library | Role | Why this and not alternatives |
|---|---|---|
| **Tailwind v4** | Styling | CSS-first config (`@theme` block), no JS config file, faster, palette tokens auto-flow into utilities |
| **shadcn/ui** | Component primitives (Dialog, Tooltip, Tabs, Command, ScrollArea) | Copies into project, you own the code, restyle aggressively without library fighting; built on Radix |
| **cmdk** | Command palette behavior | Battle-tested (powers Linear, Vercel etc.); accessibility built-in; pairs with shadcn `<Command>` |
| **lucide-react** | Generic UI icons | Ships with shadcn's "new-york" preset; monochrome SVG; fits aesthetic at small sizes |
| **react-icons** (kept) | Brand marks | For specific tech logos Lucide doesn't ship |
| **Vitest** | Test runner | Vite-native; fast; Jest-compatible API |
| **React Testing Library** | DOM testing | Standard for React component tests |
| **jsdom** | Test environment | Default browser-like env for Vitest |
| **class-variance-authority** | Variant styling | Required by shadcn for component variants |
| **tailwind-merge** + **clsx** | className composition | shadcn `cn()` helper |
| **dayjs** (kept) | Date formatting | Already in project; small footprint |
| **react-markdown** (kept) | Resume markdown | Already in project; resume content is markdown |
| **@fontsource-variable/geist-mono** | Self-hosted Geist Mono | No FOIT, works offline, GDPR-safe |
| **React 19** (upgrade from 18) | Framework | Doing a greenfield rebuild — capture upgrade in same PR; no behavior change required |

## Removed dependencies (don't try to bring back)

| Package | Was used for | Replacement |
|---|---|---|
| `@chakra-ui/react` | Component library | shadcn/ui |
| `@emotion/react` + `@emotion/styled` | CSS-in-JS (paired with Chakra) | Tailwind |
| `tippy.js` + `react-tippy` | Tooltips | shadcn `<Tooltip>` (Radix) |
| `next-themes` | Light/dark mode toggling | None — dark only |
| `swr` | Data fetching | None — was unused |
| `@octokit/graphql` | GitHub API | None initially; can re-add when wiring `useGitHub` later |
| `@fontsource-variable/inter` | Inter font | `@fontsource-variable/geist-mono` |
| `framer-motion` | Animation | None — `setTimeout` + CSS keyframes |

## Concrete identity / content values (pulled from existing data, current as of 2026-05-06)

| Field | Value | Source |
|---|---|---|
| Display name | Gary Rivera | spec |
| Title | software engineer · ny | spec |
| Email | `gary.rivera@hyperfi.ai` | conversation |
| GitHub | `https://github.com/gary-rivera` | `src/data/projects.ts` const `GH_USER_LINK` |
| LinkedIn | **TBD — user to provide** | — |
| Resume PDF location | `/resume.pdf` (will need to be placed in `public/`) | spec |
| Favicon | `/gr-signature.png` | existing `public/` |

## Existing data shapes (real, from current source — adjust the plan's render code to match these)

### `src/data/experience.ts`

- **Named export:** `events: CareerEvent[]` (NOT `experience`)
- **Type `CareerEvent`:**
  ```ts
  type CareerEvent = {
    event: string;                    // headline of the event (e.g. "Senior Developer", "Cross-platform integration")
    subtitle?: string;                // employer short name (e.g. "Extra", "Orchard")
    companyName?: string;             // employer full name (e.g. "Orchard Mortgage")
    companyDescription?: string;      // employer blurb
    description?: string;             // event description
    date: string;                     // human-readable string — "Mar 2024", "Feb 2024 → Sep 2024" — NOT parseable as a Date
    origin?: string;                  // employer URL
    icon?: any;                       // ReactNode (Chakra-coupled in original; refactor to a string asset path during migration)
    attributes?: { attribute: string; colorScheme: string }[]; // tag chips
    category: "milestone" | "achievement" | "impact"; // controls card variant
  };
  ```
- **Currently 11 entries** spanning 2021 (Rithm bootcamp graduation) through 2024 (Orchard cross-platform integration).
- **Important:** This file imports `employers` from `@/components/Employers`, which has Chakra dependencies (`<Icon>`, `<Image>`). The Employers module must be refactored to a pure data file at `src/data/employers.ts` BEFORE the wipe in plan Task 1, otherwise `experience.ts` will be broken until then.

### `src/data/employers.ts` (does not exist yet — must be created from `src/components/Employers.tsx`)

Shape it as plain data (no Chakra components). Suggested:
```ts
export interface Employer {
  shortName: string;
  companyName: string;
  description: string;
  url: string;
  iconSrc?: string; // import path string for the logo, or undefined
}
export const employers: Record<"orchard" | "extra" | "knowCap" | "numbersApi" | "rithmSchool", Employer>;
```
Companies with values from current code: orchard (Orchard Mortgage), extra (Extra Card), knowCap (KnowledgeCaptial), numbersApi (Numbers API), rithmSchool (Rithm School). Existing icon assets live at `src/assets/icons/experience/extra-logo-mini.svg` and `orchard-logo-mini.png`. Other employers use a placeholder (`company-avatar-placeholder.svg`).

### `src/data/projects.ts`

- **Named export:** `ProjectCatalog: Projects` (NOT `projects`) — a keyed object, not an array. Also exports `projectTagsConfig` and `projectCatalogKeys` (active project keys filtered).
- **Type `Project`:**
  ```ts
  type Project = {
    logoConfig: [string, { height: number | string; width: number | string | any[] }];
    name: string;                     // display name
    links: { npm?: string | null; repo?: string | null; deployment?: string | null };
    description?: string | null;
    languages?: string[];
    tags?: string[];
    createdAt?: Date;
    totalCommits?: number;            // NOT `commits` — note this when wiring ActivityPane
    active: boolean;
  };
  ```
- **6 active projects** (all `active: true`, all keyed):
  - `ruio` — npm package; no description; no totalCommits
  - `calculator` — first-project; no totalCommits
  - `gbot` — small CLI; no totalCommits
  - `dead-mart` — game project (Deadlock-themed)
  - `meme-generator` — Meme Genie
  - `flappy-js` — Snaily JS (renamed; logo asset still named `flappy-js-logo.png`)
- **All `repo` links use the same constant** `GH_USER_LINK = "https://github.com/gary-rivera"`.
- **`totalCommits` is not populated for any project currently** — `<ActivityPane>` should hard-code aspirational percentages rather than try to derive from `totalCommits`.
- **`tags` are empty arrays** in current data — `<Projects>` cards should not render the tag block when empty.

## Wiped from existing codebase (intentionally; don't try to bring back)

- `src/components/` everything (Chakra-coupled): `MainHeader`, `NameTypingEffect`, `ContactMeIconTray`, `ResumeDialogContainer`, `ResumeCvComponent`, `ResizeIcon`, `ProfileSection`, `ExperienceSection`, `AcheivementsContainer`, `ActionableTextHighlight`, `ThemeToggleButton`, `LinkIconFactory`, `Employers`, `experience/*`, `projects/*`, `header/*`, `resume/*`
- `src/context/` (`ProjectsContext`, `ThemeContext`)
- `src/styles/` (Chakra `theme.ts` system, `GlobalStyles.tsx`, the `EventCardRecipe`)
- `src/utils/` (`tooltipConfig.ts`, `badges.ts`, `layoutHelper.ts`)
- `src/services/` (`api.ts` — Octokit setup)
- `src/App.tsx`, `src/main.tsx` (rebuilt fresh)
- `src/hooks/useDistanceBetweenElements.ts.tsx` (Chakra-coupled)
- The 4x4 subgrid background pattern in `:root::before`
- The Inter font setup
- The `next-themes` provider, `ThemeContext`, `ThemeToggleButton`
- The macOS-style window chrome plan (was discussed, dropped)

## Behavior cheatsheet for the Sidebar lists

For convenience — these are the pre-filled values the plan tasks reference:

```ts
// PINNED (in order)
{ id: "resume",   label: "resume.pdf",  action: "open-resume" }
{ id: "github",   label: "github",      href: "https://github.com/gary-rivera" }
{ id: "linkedin", label: "linkedin",    href: "https://www.linkedin.com/in/<TBD>/" }
{ id: "email",    label: "email",       href: "mailto:gary.rivera@hyperfi.ai" }

// STACK (in order, visual only)
"react" "typescript" "vite" "node" "tailwind"
```

## Open browser at the brainstorming visual companion

If the implementing agent wants to revisit any of the visual mockups produced during brainstorming (palette comparisons, layout options, font samples), files persist at:

```
.superpowers/brainstorm/2739-1778114454/content/
├── layout-structure.html
├── panel-mapping.html
├── color-palette.html         # initial 3 palettes
├── color-palette-v2.html      # 10 palettes from sub-agent dispatch
├── palettes-final.html        # same as v2, served fresh
└── typography.html            # 4 monospace fonts
```

Open via `scripts/start-server.sh --project-dir .` from the brainstorming skill, or just open the HTML files directly in a browser. (`.superpowers/` is gitignored.)

