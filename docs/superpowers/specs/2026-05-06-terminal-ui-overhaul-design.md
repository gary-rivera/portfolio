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

Framer Motion used for the typing effect and boot sequence. Everything else is CSS.

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
- **GitHub API integration** — `useGitHub`/Octokit kept in repo but not wired. Could surface live commit data in `<ActivityPane>` later.
- **Light mode** — explicitly out of scope. Could be added later but would dilute the aesthetic.
- **Analytics** — none planned.
