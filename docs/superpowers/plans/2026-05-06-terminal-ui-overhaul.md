# Terminal-UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as a multi-panel TUI on Tailwind v4 + shadcn with the "Teal Curfew" palette and Geist Mono, replacing the current Chakra-based narrative layout.

**Architecture:** Greenfield rebuild on `overhaul/terminal-ui` branch. Wipe `src/components`, `src/styles`, `src/context`, `App.tsx`, `main.tsx`. Keep `src/data` and `src/assets`. Replace Chakra/Emotion/Tippy with Tailwind v4 + shadcn/Radix primitives. Add `cmdk` for command palette. URL hash drives `activeSection` state — no router library. Single-page, no SSR.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind v4 (CSS-first), shadcn/ui, cmdk, Framer Motion (typing effect + boot only), Geist Mono Variable, Vitest + React Testing Library for tests.

**Spec:** `docs/superpowers/specs/2026-05-06-terminal-ui-overhaul-design.md`

---

## Pre-flight

The project is at `/Users/gr/dev/portfolio`. Current branch is `main`, working tree clean. Node 20+ assumed. `npm` is the package manager (use `npm install` / `npm run`, not pnpm/yarn).

Tasks below assume you start each command from the project root unless stated otherwise.

---

## Phase 1 — Foundation

### Task 1: Cut branch and wipe legacy source

**Files:**
- Delete: `src/components/`, `src/context/`, `src/styles/`, `src/utils/`, `src/services/`, `src/App.tsx`, `src/main.tsx`
- Keep: `src/data/`, `src/assets/`, `src/hooks/useGitHub.ts`, `index.html`, `tsconfig*.json`, `vite.config.ts`, `eslint.config.js`, `.prettierrc`

- [ ] **Step 1: Cut and switch to a new branch**

```bash
git checkout -b overhaul/terminal-ui
```

- [ ] **Step 2: Delete legacy source directories and entry files**

```bash
rm -rf src/components src/context src/styles src/utils src/services
rm src/App.tsx src/main.tsx
ls src
```

Expected: `src` contains only `assets/`, `data/`, and `hooks/`.

- [ ] **Step 3: Remove the unused `useDistanceBetweenElements` hook (Chakra-coupled), keep `useGitHub`**

```bash
rm src/hooks/useDistanceBetweenElements.ts.tsx
ls src/hooks
```

Expected: `src/hooks` contains only `useGitHub.ts`.

- [ ] **Step 4: Commit the wipe**

```bash
git add -A
git commit -m "chore: wipe legacy chakra ui in preparation for terminal overhaul"
```

---

### Task 2: Update package.json — remove old deps, add new ones

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove unused dependencies (Chakra, Emotion, Tippy, next-themes, SWR, Octokit, Inter font, Framer Motion)**

```bash
npm uninstall @chakra-ui/react @emotion/react @emotion/styled @octokit/graphql tippy.js next-themes swr @fontsource-variable/inter react-tippy framer-motion
```

(Note: the spec mentioned keeping Framer Motion for boot sequence + typing effect, but in practice neither needs it — `setTimeout` and CSS animations cover everything. Removing it saves a sizable dependency. `react-icons`, `dayjs`, `react-markdown` stay.)

- [ ] **Step 2: Upgrade React to 19**

```bash
npm install react@^19.0.0 react-dom@^19.0.0
npm install -D @types/react@^19.0.0 @types/react-dom@^19.0.0
```

- [ ] **Step 3: Add Tailwind v4, PostCSS, font, cmdk, lucide-react, cva, tailwind-merge, clsx**

```bash
npm install -D tailwindcss@^4 @tailwindcss/vite@^4
npm install @fontsource-variable/geist-mono cmdk lucide-react class-variance-authority tailwind-merge clsx
```

- [ ] **Step 4: Add Vitest + React Testing Library + jsdom**

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 5: Add a `test` script to package.json**

Open `package.json` and update the `scripts` block to:

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest",
  "test:run": "vitest run"
}
```

- [ ] **Step 6: Verify install + commit**

```bash
npm install
git add package.json package-lock.json
git commit -m "chore: swap chakra for tailwind v4 + shadcn deps; add vitest"
```

---

### Task 3: Configure Vite for Tailwind v4 and create globals.css

**Files:**
- Modify: `vite.config.ts`
- Create: `src/styles/globals.css`
- Create: `src/lib/cn.ts`

- [ ] **Step 1: Update `vite.config.ts` to load the Tailwind v4 plugin**

Replace the file contents with:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 2: Create `src/styles/globals.css` with the @theme tokens**

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

/* shadcn semantic mappings — primitives auto-inherit our palette */
:root {
  --background: var(--color-bg);
  --foreground: var(--color-text);
  --card: var(--color-surface-1);
  --card-foreground: var(--color-text);
  --popover: var(--color-surface-1);
  --popover-foreground: var(--color-text);
  --primary: var(--color-accent);
  --primary-foreground: var(--color-bg);
  --secondary: var(--color-surface-2);
  --secondary-foreground: var(--color-text);
  --muted: var(--color-surface-1);
  --muted-foreground: var(--color-text-muted);
  --accent: var(--color-accent);
  --accent-foreground: var(--color-bg);
  --destructive: var(--color-pip);
  --destructive-foreground: var(--color-text);
  --border: var(--color-border);
  --input: var(--color-border);
  --ring: var(--color-accent);
  --radius: var(--radius-panel);
}

html, body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-feature-settings: "ss01", "cv11";
}

* { border-color: var(--color-border); }

::selection { background: var(--color-accent-muted); color: var(--color-text); }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-surface-2); }
::-webkit-scrollbar-thumb:hover { background: var(--color-border); }
```

- [ ] **Step 3: Create `src/lib/cn.ts` (shadcn classname helper)**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts src/styles/globals.css src/lib/cn.ts
git commit -m "feat: configure tailwind v4 with teal curfew tokens + shadcn variable mapping"
```

---

### Task 4: Initialize shadcn and install primitives

**Files:**
- Create: `components.json`
- Create: `src/components/ui/dialog.tsx`, `tooltip.tsx`, `tabs.tsx`, `command.tsx`, `scroll-area.tsx` (via shadcn CLI)

- [ ] **Step 1: Create `components.json` manually (shadcn init asks interactive questions, this skips them)**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/cn",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 2: Install primitives via shadcn CLI**

```bash
npx shadcn@latest add dialog tooltip tabs command scroll-area
```

If prompted, accept defaults. Verify created files:

```bash
ls src/components/ui
```

Expected: `dialog.tsx`, `tooltip.tsx`, `tabs.tsx`, `command.tsx`, `scroll-area.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components.json src/components/ui
git commit -m "feat: install shadcn primitives (dialog, tooltip, tabs, command, scroll-area)"
```

---

### Task 5: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test-setup.ts`
- Modify: `tsconfig.app.json`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    css: false,
  },
});
```

- [ ] **Step 2: Create `src/test-setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add Vitest globals + jest-dom types to `tsconfig.app.json`**

Open `tsconfig.app.json` and add `"vitest/globals"` and `"@testing-library/jest-dom"` to the `compilerOptions.types` array (create the array if missing). Also add `"src/test-setup.ts"` to `include`.

Example final shape of the relevant fields:

```json
{
  "compilerOptions": {
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "src/test-setup.ts"]
}
```

- [ ] **Step 4: Verify Vitest can run (no tests yet, but the runner should start)**

```bash
npm run test:run
```

Expected: "No test files found" (success — runner is wired correctly).

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts src/test-setup.ts tsconfig.app.json
git commit -m "feat: configure vitest + react testing library"
```

---

## Phase 2 — Primitive components

### Task 6: `<Tree>` and `<Tree.Item>` primitive

The Tree primitive renders ASCII tree characters (`├ └ │`) based on each item's position in a list. It is the visual backbone of the sidebar.

**Files:**
- Create: `src/components/Tree.tsx`
- Create: `src/components/Tree.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/Tree.test.tsx
import { render, screen } from "@testing-library/react";
import { Tree } from "./Tree";

describe("Tree", () => {
  it("renders branch glyph (├) for non-last items", () => {
    render(
      <Tree>
        <Tree.Item>first</Tree.Item>
        <Tree.Item>middle</Tree.Item>
        <Tree.Item isLast>last</Tree.Item>
      </Tree>
    );
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("├");
    expect(items[1]).toHaveTextContent("├");
    expect(items[2]).toHaveTextContent("└");
  });

  it("applies active styling when active prop is true", () => {
    render(
      <Tree>
        <Tree.Item active>about</Tree.Item>
      </Tree>
    );
    expect(screen.getByText("about").parentElement).toHaveClass("text-accent");
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

```bash
npm run test:run -- src/components/Tree.test.tsx
```

Expected: FAIL with "Cannot find module './Tree'".

- [ ] **Step 3: Implement `<Tree>` and `<Tree.Item>`**

```tsx
// src/components/Tree.tsx
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
  const pad = " ".repeat(indent * 2);
  return (
    <li
      onClick={onClick}
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
```

- [ ] **Step 4: Run test, verify it passes**

```bash
npm run test:run -- src/components/Tree.test.tsx
```

Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/Tree.tsx src/components/Tree.test.tsx
git commit -m "feat: add Tree primitive with ASCII glyph rendering"
```

---

### Task 7: `<HatchBar>` primitive

Diagonal-hatch progress bar via repeating-linear-gradient.

**Files:**
- Create: `src/components/HatchBar.tsx`

- [ ] **Step 1: Implement `<HatchBar>`**

```tsx
// src/components/HatchBar.tsx
import { cn } from "@/lib/cn";

interface HatchBarProps {
  /** Progress percentage 0-100 */
  value: number;
  label?: string;
  className?: string;
}

export function HatchBar({ value, label, className }: HatchBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex items-center gap-2 font-mono text-xs", className)}>
      {label && <span className="text-text-dim min-w-[80px] truncate">{label}</span>}
      <div className="flex-1 h-2 bg-surface-2 border border-border overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${clamped}%`,
            background:
              "repeating-linear-gradient(45deg, var(--color-accent) 0 4px, var(--color-accent-muted) 4px 8px)",
          }}
        />
      </div>
      <span className="text-accent tabular-nums min-w-[36px] text-right">{clamped}%</span>
    </div>
  );
}
```

- [ ] **Step 2: Smoke-render HatchBar in App temporarily for visual verification**

(Skip if App is not yet built. We'll verify visually in Task 11 when the layout shell is in place.)

- [ ] **Step 3: Commit**

```bash
git add src/components/HatchBar.tsx
git commit -m "feat: add HatchBar progress primitive with diagonal-hatch fill"
```

---

### Task 8: `<BlinkCursor>` primitive

Persistent CSS-driven blink. No JS.

**Files:**
- Create: `src/components/BlinkCursor.tsx`
- Modify: `src/styles/globals.css` (add keyframe)

- [ ] **Step 1: Add `@keyframes blink` to globals.css**

Append to `src/styles/globals.css`:

```css
@keyframes blink {
  0%, 60% { opacity: 1; }
  60.01%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1s steps(1, end) infinite;
}
```

- [ ] **Step 2: Implement `<BlinkCursor>`**

```tsx
// src/components/BlinkCursor.tsx
import { cn } from "@/lib/cn";

interface BlinkCursorProps {
  className?: string;
  variant?: "block" | "underscore";
}

export function BlinkCursor({ className, variant = "block" }: BlinkCursorProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block animate-blink bg-accent align-baseline",
        variant === "block" ? "w-[0.55em] h-[1.1em] -mb-[2px]" : "w-[0.55em] h-[2px]",
        className
      )}
    />
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/BlinkCursor.tsx src/styles/globals.css
git commit -m "feat: add BlinkCursor primitive (CSS-driven, no JS)"
```

---

### Task 9: `<TypingText>` component (port from existing logic)

Port the existing typewriter reducer from the old `NameTypingEffect.tsx` (which we wiped). Reimplement it cleanly here.

**Files:**
- Create: `src/components/TypingText.tsx`
- Create: `src/components/TypingText.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/TypingText.test.tsx
import { render, screen, act } from "@testing-library/react";
import { TypingText } from "./TypingText";

describe("TypingText", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("types out the text one character at a time", () => {
    render(<TypingText text="hi" charDelayMs={50} startDelayMs={0} />);
    expect(screen.getByTestId("typing-text").textContent).toBe("");
    act(() => { vi.advanceTimersByTime(50); });
    expect(screen.getByTestId("typing-text").textContent).toBe("h");
    act(() => { vi.advanceTimersByTime(50); });
    expect(screen.getByTestId("typing-text").textContent).toBe("hi");
  });

  it("calls onComplete when done", () => {
    const onComplete = vi.fn();
    render(<TypingText text="ok" charDelayMs={20} startDelayMs={0} onComplete={onComplete} />);
    act(() => { vi.advanceTimersByTime(60); });
    expect(onComplete).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

```bash
npm run test:run -- src/components/TypingText.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Implement `<TypingText>`**

```tsx
// src/components/TypingText.tsx
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface TypingTextProps {
  text: string;
  charDelayMs?: number;
  startDelayMs?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypingText({
  text,
  charDelayMs = 60,
  startDelayMs = 0,
  onComplete,
  className,
}: TypingTextProps) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    let typingId: ReturnType<typeof setInterval> | null = null;

    const startId = setTimeout(() => {
      typingId = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          if (typingId) clearInterval(typingId);
          onComplete?.();
        }
      }, charDelayMs);
    }, startDelayMs);

    return () => {
      clearTimeout(startId);
      if (typingId) clearInterval(typingId);
    };
  }, [text, charDelayMs, startDelayMs, onComplete]);

  return (
    <span data-testid="typing-text" className={cn(className)}>
      {shown}
    </span>
  );
}
```

- [ ] **Step 4: Run test, verify it passes**

```bash
npm run test:run -- src/components/TypingText.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/TypingText.tsx src/components/TypingText.test.tsx
git commit -m "feat: add TypingText component with onComplete hook"
```

---

## Phase 3 — Application shell

### Task 10: `useActiveSection` hook (URL hash sync)

**Files:**
- Create: `src/app/routes.ts`
- Create: `src/hooks/useActiveSection.ts`
- Create: `src/hooks/useActiveSection.test.ts`

- [ ] **Step 1: Create the routes module**

```ts
// src/app/routes.ts
export const SECTIONS = ["about", "experience", "projects", "contact"] as const;
export type SectionId = typeof SECTIONS[number];
export const DEFAULT_SECTION: SectionId = "about";

export function isSectionId(value: unknown): value is SectionId {
  return typeof value === "string" && (SECTIONS as readonly string[]).includes(value);
}
```

- [ ] **Step 2: Write the failing test**

```ts
// src/hooks/useActiveSection.test.ts
import { renderHook, act } from "@testing-library/react";
import { useActiveSection } from "./useActiveSection";

describe("useActiveSection", () => {
  beforeEach(() => { window.location.hash = ""; });

  it("defaults to 'about' when hash is empty", () => {
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeSection).toBe("about");
  });

  it("reads section from URL hash on mount", () => {
    window.location.hash = "#experience";
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeSection).toBe("experience");
  });

  it("ignores unknown hash values and defaults to 'about'", () => {
    window.location.hash = "#nonsense";
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeSection).toBe("about");
  });

  it("setActiveSection updates state and writes hash", () => {
    const { result } = renderHook(() => useActiveSection());
    act(() => { result.current.setActiveSection("projects"); });
    expect(result.current.activeSection).toBe("projects");
    expect(window.location.hash).toBe("#projects");
  });
});
```

- [ ] **Step 3: Run test, verify it fails**

```bash
npm run test:run -- src/hooks/useActiveSection.test.ts
```

Expected: FAIL.

- [ ] **Step 4: Implement the hook**

```ts
// src/hooks/useActiveSection.ts
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_SECTION, isSectionId, type SectionId } from "@/app/routes";

function readHash(): SectionId {
  const raw = window.location.hash.replace(/^#/, "");
  return isSectionId(raw) ? raw : DEFAULT_SECTION;
}

export function useActiveSection() {
  const [activeSection, setActive] = useState<SectionId>(() => readHash());

  useEffect(() => {
    const onHashChange = () => setActive(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const setActiveSection = useCallback((id: SectionId) => {
    if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    }
    setActive(id);
  }, []);

  return { activeSection, setActiveSection };
}
```

- [ ] **Step 5: Run test, verify it passes**

```bash
npm run test:run -- src/hooks/useActiveSection.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/app/routes.ts src/hooks/useActiveSection.ts src/hooks/useActiveSection.test.ts
git commit -m "feat: add useActiveSection hook with URL hash sync"
```

---

### Task 11: Application layout shell

This task gets a visible-in-browser shell with the 3-zone grid, placeholder panels, and Geist Mono rendering. From this point onward, you can run `npm run dev` and visually verify each subsequent task in the browser.

**Files:**
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Modify: `index.html`

- [ ] **Step 1: Update `index.html` to drop the old Inter font preload and update the title**

Replace the contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/gr-signature.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>gary rivera — software engineer</title>
    <meta name="description" content="Portfolio of Gary Rivera, software engineer." />
  </head>
  <body>
    <div id="root"></div>
    <div id="dialog-root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create `src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/globals.css";
import { App } from "@/app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 3: Create `src/app/App.tsx` with the 3-zone grid + placeholders**

```tsx
// src/app/App.tsx
import { useActiveSection } from "@/hooks/useActiveSection";

export function App() {
  const { activeSection } = useActiveSection();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-mono">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-0">
        <aside className="border-b md:border-b-0 md:border-r border-border bg-surface-1 p-4">
          <div className="text-text-dim text-xs tracking-widest">SIDEBAR</div>
        </aside>

        <div className="flex flex-col min-h-0">
          <main className="flex-1 p-4 overflow-auto">
            <div className="text-accent text-sm">~/{activeSection}</div>
            <div className="text-text-muted text-xs mt-2">MAIN PANEL</div>
          </main>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            <section className="p-3 border-b md:border-b-0 md:border-r border-border bg-surface-1">
              <div className="text-text-dim text-xs tracking-widest">ACTIVITY</div>
            </section>
            <section className="p-3 bg-surface-1">
              <div className="text-text-dim text-xs tracking-widest">LINKS</div>
            </section>
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 border-t border-border bg-surface-1 px-4 py-2 text-sm">
        <span className="text-accent">→</span>{" "}
        <span className="text-text-muted">command prompt placeholder</span>
      </footer>
    </div>
  );
}
```

- [ ] **Step 4: Run dev server and visually verify**

```bash
npm run dev
```

Open the printed URL. Expected:
- Dark background `#0A1014`
- Geist Mono font
- 4 quadrants visible with their labels (`SIDEBAR`, `MAIN PANEL`, `ACTIVITY`, `LINKS`)
- `~/about` in teal at top of main panel
- Footer prompt with teal `→`

Hit Ctrl+C to stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add index.html src/main.tsx src/app/App.tsx
git commit -m "feat: scaffold app shell with 3-zone tui grid"
```

---

### Task 12: `<BootSequence>` component

**Files:**
- Create: `src/components/BootSequence.tsx`

- [ ] **Step 1: Implement `<BootSequence>`**

```tsx
// src/components/BootSequence.tsx
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const LINES = [
  "→ initializing tui …",
  "→ mounting filesystem …",
  "→ loading ~/gary-rivera",
];

interface BootSequenceProps {
  /** Time between line renders (ms). Default 150ms. */
  lineDelayMs?: number;
  /** Time the final line stays before completing (ms). Default 200ms. */
  tailMs?: number;
  onComplete: () => void;
  className?: string;
}

export function BootSequence({
  lineDelayMs = 150,
  tailMs = 200,
  onComplete,
  className,
}: BootSequenceProps) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let cancelled = false;

    function step(i: number) {
      if (cancelled) return;
      setShown(i);
      if (i < LINES.length) {
        setTimeout(() => step(i + 1), lineDelayMs);
      } else {
        setTimeout(() => { if (!cancelled) onComplete(); }, tailMs);
      }
    }

    step(1);

    function skip(e: KeyboardEvent) {
      e.preventDefault();
      cancelled = true;
      onComplete();
    }
    window.addEventListener("keydown", skip, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("keydown", skip);
    };
  }, [lineDelayMs, tailMs, onComplete]);

  return (
    <div className={cn("font-mono text-sm text-text-muted p-6 flex flex-col gap-1", className)}>
      {LINES.slice(0, shown).map((line, i) => (
        <div key={i} className={i === shown - 1 ? "text-accent" : "text-text-muted"}>
          {line}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BootSequence.tsx
git commit -m "feat: add BootSequence component (skippable, ~600ms)"
```

(Wiring this into App is deferred to Task 24 — once the layout is fully built, we wrap with the boot gate then.)

---

## Phase 4 — Panels and sections

### Task 13: `<Sidebar>` panel

**Files:**
- Create: `src/panels/Sidebar.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Implement `<Sidebar>`**

```tsx
// src/panels/Sidebar.tsx
import { Tree } from "@/components/Tree";
import { SECTIONS, type SectionId } from "@/app/routes";

interface SidebarProps {
  activeSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onOpenResume: () => void;
}

const PINNED = [
  { id: "resume", label: "resume.pdf", action: "resume" as const },
  { id: "github", label: "github", href: "https://github.com/garyrivera1992" },
  { id: "linkedin", label: "linkedin", href: "https://www.linkedin.com/in/garyrivera1992/" },
  { id: "email", label: "email", href: "mailto:gary.rivera@hyperfi.ai" },
];

const STACK = ["react", "typescript", "vite", "node", "tailwind"];

export function Sidebar({ activeSection, onSelectSection, onOpenResume }: SidebarProps) {
  return (
    <aside className="border-b md:border-b-0 md:border-r border-border bg-surface-1 p-4 overflow-y-auto">
      <div className="text-text mb-1">
        <span className="text-text-dim">~/</span>gary-rivera
      </div>

      <Tree className="mb-6">
        {SECTIONS.map((id, i) => (
          <Tree.Item
            key={id}
            isLast={i === SECTIONS.length - 1}
            active={id === activeSection}
            onClick={() => onSelectSection(id)}
          >
            {id}
          </Tree.Item>
        ))}
      </Tree>

      <div className="text-accent text-xs tracking-widest mb-2">★ PINNED</div>
      <Tree className="mb-6">
        {PINNED.map((item, i) => {
          const isLast = i === PINNED.length - 1;
          if (item.action === "resume") {
            return (
              <Tree.Item key={item.id} isLast={isLast} onClick={onOpenResume}>
                {item.label}
              </Tree.Item>
            );
          }
          return (
            <Tree.Item
              key={item.id}
              isLast={isLast}
              onClick={() => window.open(item.href, "_blank", "noopener")}
            >
              {item.label}
            </Tree.Item>
          );
        })}
      </Tree>

      <div className="text-accent text-xs tracking-widest mb-2">⊞ STACK</div>
      <Tree>
        {STACK.map((s, i) => (
          <Tree.Item key={s} isLast={i === STACK.length - 1}>
            {s}
          </Tree.Item>
        ))}
      </Tree>
    </aside>
  );
}
```

(Note: Replace the GitHub/LinkedIn/email URLs above with your actual handles. Open `src/data/employers.ts` or similar if those URLs already live in the existing data files; otherwise, fill in your real values now.)

- [ ] **Step 2: Wire `<Sidebar>` into App, replacing the placeholder aside**

Replace `src/app/App.tsx` with:

```tsx
// src/app/App.tsx
import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Sidebar } from "@/panels/Sidebar";

export function App() {
  const { activeSection, setActiveSection } = useActiveSection();
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-mono">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-0">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenResume={() => setResumeOpen(true)}
        />

        <div className="flex flex-col min-h-0">
          <main className="flex-1 p-4 overflow-auto">
            <div className="text-accent text-sm">~/{activeSection}</div>
            <div className="text-text-muted text-xs mt-2">MAIN PANEL</div>
          </main>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            <section className="p-3 border-b md:border-b-0 md:border-r border-border bg-surface-1">
              <div className="text-text-dim text-xs tracking-widest">ACTIVITY</div>
            </section>
            <section className="p-3 bg-surface-1">
              <div className="text-text-dim text-xs tracking-widest">LINKS</div>
            </section>
          </div>
        </div>
      </div>

      <footer className="sticky bottom-0 border-t border-border bg-surface-1 px-4 py-2 text-sm">
        <span className="text-accent">→</span>{" "}
        <span className="text-text-muted">command prompt placeholder</span>
      </footer>

      {resumeOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setResumeOpen(false)}>
          <div className="bg-surface-1 border border-border p-6 text-text">resume placeholder</div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Visually verify**

```bash
npm run dev
```

Expected: sidebar shows `~/gary-rivera` header, the four nav items with tree characters, the active item (about by default) highlighted in teal, the PINNED group, the STACK group. Clicking nav items updates `~/<section>` in main panel and updates the URL hash. Clicking `resume.pdf` shows the placeholder modal.

- [ ] **Step 4: Commit**

```bash
git add src/panels/Sidebar.tsx src/app/App.tsx
git commit -m "feat: build Sidebar with nav tree, pinned, and stack groups"
```

---

### Task 14: `<MainPanel>` and `<About>` section

**Files:**
- Create: `src/panels/MainPanel.tsx`
- Create: `src/sections/About.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Create the About section**

```tsx
// src/sections/About.tsx
import { TypingText } from "@/components/TypingText";
import { BlinkCursor } from "@/components/BlinkCursor";

interface AboutProps {
  /** When true, the typing animation may begin. */
  ready: boolean;
}

export function About({ ready }: AboutProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <div className="text-text-dim text-xs tracking-widest">// PROFILE</div>
        <h1 className="text-2xl text-accent">
          {ready ? <TypingText text="gary r." charDelayMs={70} startDelayMs={100} /> : <span>&nbsp;</span>}
          <BlinkCursor className="ml-1" />
        </h1>
        <p className="text-text-muted text-sm">software engineer · ny</p>
      </div>

      <p className="text-text max-w-2xl leading-relaxed text-sm">
        Building thoughtful tools at the intersection of TUI ergonomics and the modern web.
        Currently shipping realtime infra and the occasional terminal interface.
      </p>

      <div className="space-y-2">
        <div className="text-text-dim text-xs tracking-widest">// CURRENTLY</div>
        <ul className="text-sm text-text-muted space-y-1">
          <li>→ shipping <span className="text-accent">snaily v0.4</span></li>
          <li>→ rebuilding portfolio in tui aesthetic</li>
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the MainPanel**

```tsx
// src/panels/MainPanel.tsx
import type { SectionId } from "@/app/routes";
import { About } from "@/sections/About";

interface MainPanelProps {
  activeSection: SectionId;
  bootComplete: boolean;
}

export function MainPanel({ activeSection, bootComplete }: MainPanelProps) {
  return (
    <main className="flex-1 p-6 overflow-auto min-h-0">
      <div className="text-accent text-sm mb-6 border-b border-border pb-3">
        ~/<span className="text-text">{activeSection}</span>
      </div>
      {activeSection === "about" && <About ready={bootComplete} />}
      {activeSection === "experience" && <div className="text-text-muted text-sm">experience placeholder</div>}
      {activeSection === "projects" && <div className="text-text-muted text-sm">projects placeholder</div>}
      {activeSection === "contact" && <div className="text-text-muted text-sm">contact placeholder</div>}
    </main>
  );
}
```

- [ ] **Step 3: Wire MainPanel into App, hardcode `bootComplete={true}` for now**

Replace the inline `<main>` in `src/app/App.tsx` with `<MainPanel>`:

```tsx
// in App.tsx — inside the right column, replace the inline <main> ... </main>
<MainPanel activeSection={activeSection} bootComplete={true} />
```

Add the import at the top:
```tsx
import { MainPanel } from "@/panels/MainPanel";
```

- [ ] **Step 4: Visually verify**

```bash
npm run dev
```

Expected: About section renders with typing effect on "gary r." and a blinking cursor. Clicking other nav items shows their placeholders.

- [ ] **Step 5: Commit**

```bash
git add src/panels/MainPanel.tsx src/sections/About.tsx src/app/App.tsx
git commit -m "feat: add MainPanel and About section with typing effect"
```

---

### Task 15: `<Experience>` section

The existing experience data is in `src/data/experience.ts`. This task ports it to the terminal aesthetic. First, read the existing data file to confirm its shape.

**Files:**
- Read: `src/data/experience.ts` (verify shape)
- Create: `src/sections/Experience.tsx`
- Modify: `src/panels/MainPanel.tsx`

- [ ] **Step 1: Open and inspect the existing data shape**

```bash
cat src/data/experience.ts
```

Note the type — typically a `CareerEvent[]` with fields like `date`, `company`, `role`, `description`. Adapt the next step's code to match the actual field names you find.

- [ ] **Step 2: Implement `<Experience>` (adapt field names to match the data file)**

```tsx
// src/sections/Experience.tsx
import { experience } from "@/data/experience";
import { Tree } from "@/components/Tree";
import dayjs from "dayjs";

export function Experience() {
  return (
    <div className="space-y-6">
      <div className="text-text-dim text-xs tracking-widest">// CAREER LOG</div>
      <Tree>
        {experience.map((evt, i) => {
          const isLast = i === experience.length - 1;
          const date = dayjs(evt.date).format("YYYY.MM");
          return (
            <Tree.Item key={`${evt.company}-${i}`} isLast={isLast}>
              <span className="text-accent mr-2 tabular-nums">{date}</span>
              <span className="text-text">{evt.role}</span>
              <span className="text-text-dim mx-1">@</span>
              <span className="text-text-muted">{evt.company}</span>
              {evt.description && (
                <div className="text-text-muted text-xs ml-6 mt-1">└ {evt.description}</div>
              )}
            </Tree.Item>
          );
        })}
      </Tree>
    </div>
  );
}
```

If the imported `experience` symbol is named differently in `src/data/experience.ts` (e.g. default export, or a name like `careerEvents`), adjust the import accordingly. If field names differ (e.g. `title` instead of `role`), update field references inline. Do not invent fields that don't exist — if the data has `[startDate, endDate]` instead of `date`, render the start.

- [ ] **Step 3: Wire Experience into MainPanel**

In `src/panels/MainPanel.tsx`, replace the experience placeholder with:

```tsx
{activeSection === "experience" && <Experience />}
```

Add the import:
```tsx
import { Experience } from "@/sections/Experience";
```

- [ ] **Step 4: Visually verify**

```bash
npm run dev
```

Click "experience" in the sidebar. Expected: timeline of career events with dates in teal, role in primary text, company in muted text, descriptions indented below.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Experience.tsx src/panels/MainPanel.tsx
git commit -m "feat: build Experience section as ascii career log"
```

---

### Task 16: `<Projects>` section

**Files:**
- Read: `src/data/projects.ts`
- Create: `src/sections/Projects.tsx`
- Modify: `src/panels/MainPanel.tsx`

- [ ] **Step 1: Inspect projects data shape**

```bash
cat src/data/projects.ts
```

Note fields: typically `name`, `description`, `tags`, `repo`/`npm`/`deployment`, `commits`, `logo`, `creationDate`.

- [ ] **Step 2: Implement `<Projects>`**

```tsx
// src/sections/Projects.tsx
import { projects } from "@/data/projects";
import { ExternalLink, Github, Package } from "lucide-react";
import { cn } from "@/lib/cn";

export function Projects() {
  return (
    <div className="space-y-4">
      <div className="text-text-dim text-xs tracking-widest">// PROJECTS · {projects.length} files</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {projects.map((p) => (
          <article
            key={p.name}
            className={cn(
              "border border-border bg-surface-1 p-4",
              "hover:border-accent-muted transition-colors"
            )}
          >
            <header className="flex items-baseline justify-between mb-2">
              <h3 className="text-accent text-sm">{p.name}</h3>
              {p.commits != null && (
                <span className="text-text-dim text-xs tabular-nums">{p.commits} commits</span>
              )}
            </header>
            {p.description && (
              <p className="text-text-muted text-xs leading-relaxed mb-3">{p.description}</p>
            )}
            {p.tags && p.tags.length > 0 && (
              <div className="flex flex-wrap gap-x-2 gap-y-1 mb-3">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-text-dim text-[10px] tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 text-text-muted">
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener" className="hover:text-accent">
                  <Github size={14} />
                </a>
              )}
              {p.npm && (
                <a href={p.npm} target="_blank" rel="noopener" className="hover:text-accent">
                  <Package size={14} />
                </a>
              )}
              {p.deployment && (
                <a href={p.deployment} target="_blank" rel="noopener" className="hover:text-accent">
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
```

If field names differ (e.g. `repoUrl` instead of `repo`), adjust references.

- [ ] **Step 3: Wire Projects into MainPanel**

In `src/panels/MainPanel.tsx`:

```tsx
import { Projects } from "@/sections/Projects";
// ...
{activeSection === "projects" && <Projects />}
```

- [ ] **Step 4: Visually verify**

Run `npm run dev` and click "projects". Expected: grid of bordered project cards, name in teal, tags in dim text with `#` prefix, link icons in the bottom row.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Projects.tsx src/panels/MainPanel.tsx
git commit -m "feat: build Projects section as bordered card grid"
```

---

### Task 17: `<Contact>` section

**Files:**
- Create: `src/sections/Contact.tsx`
- Modify: `src/panels/MainPanel.tsx`

- [ ] **Step 1: Implement `<Contact>`**

```tsx
// src/sections/Contact.tsx
import { Tree } from "@/components/Tree";

const CONTACT_ITEMS = [
  { label: "email", value: "gary.rivera@hyperfi.ai", href: "mailto:gary.rivera@hyperfi.ai" },
  { label: "github", value: "@garyrivera1992", href: "https://github.com/garyrivera1992" },
  { label: "linkedin", value: "in/garyrivera1992", href: "https://www.linkedin.com/in/garyrivera1992/" },
];

export function Contact() {
  return (
    <div className="space-y-6">
      <div className="text-text-dim text-xs tracking-widest">// CONTACT</div>
      <Tree>
        {CONTACT_ITEMS.map((item, i) => (
          <Tree.Item
            key={item.label}
            isLast={i === CONTACT_ITEMS.length - 1}
            onClick={() => window.open(item.href, "_blank", "noopener")}
          >
            <span className="text-text-muted">{item.label}</span>
            <span className="text-text-dim mx-2">·</span>
            <span className="text-accent">{item.value}</span>
          </Tree.Item>
        ))}
      </Tree>
      <p className="text-text-muted text-sm max-w-xl leading-relaxed">
        Best way to reach me is email. I read everything; I reply to most.
      </p>
    </div>
  );
}
```

(Use the same URLs as in `Sidebar.tsx`. If you stored those in a shared data file, import from there instead — see Task 18.)

- [ ] **Step 2: Wire into MainPanel**

```tsx
import { Contact } from "@/sections/Contact";
// ...
{activeSection === "contact" && <Contact />}
```

- [ ] **Step 3: Visually verify and commit**

```bash
npm run dev
# verify, then:
git add src/sections/Contact.tsx src/panels/MainPanel.tsx
git commit -m "feat: build Contact section"
```

---

### Task 18: Extract pinned/contact links into a shared data module

To avoid duplication between Sidebar, Contact section, and LinksPane (next task), extract the link list into one place.

**Files:**
- Create: `src/data/links.ts`
- Modify: `src/panels/Sidebar.tsx`, `src/sections/Contact.tsx`

- [ ] **Step 1: Create `src/data/links.ts`**

```ts
// src/data/links.ts
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
  { id: "github", label: "github", value: "@garyrivera1992", href: "https://github.com/garyrivera1992" },
  { id: "linkedin", label: "linkedin", value: "in/garyrivera1992", href: "https://www.linkedin.com/in/garyrivera1992/" },
  { id: "email", label: "email", value: "gary.rivera@hyperfi.ai", href: "mailto:gary.rivera@hyperfi.ai" },
];
```

- [ ] **Step 2: Refactor `Sidebar.tsx` to consume `PINNED_LINKS`**

Replace the inline `PINNED` array in `src/panels/Sidebar.tsx` with `import { PINNED_LINKS } from "@/data/links"`. Update the rendering loop to use `item.action === "open-resume"` for the action branch and `item.href` for the link branch.

- [ ] **Step 3: Refactor `Contact.tsx` to consume `PINNED_LINKS` (filter out the resume action)**

```tsx
// src/sections/Contact.tsx
import { Tree } from "@/components/Tree";
import { PINNED_LINKS } from "@/data/links";

const CONTACT_ITEMS = PINNED_LINKS.filter((l) => l.href);

export function Contact() {
  return (
    <div className="space-y-6">
      <div className="text-text-dim text-xs tracking-widest">// CONTACT</div>
      <Tree>
        {CONTACT_ITEMS.map((item, i) => (
          <Tree.Item
            key={item.id}
            isLast={i === CONTACT_ITEMS.length - 1}
            onClick={() => window.open(item.href, "_blank", "noopener")}
          >
            <span className="text-text-muted">{item.label}</span>
            <span className="text-text-dim mx-2">·</span>
            <span className="text-accent">{item.value}</span>
          </Tree.Item>
        ))}
      </Tree>
      <p className="text-text-muted text-sm max-w-xl leading-relaxed">
        Best way to reach me is email. I read everything; I reply to most.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Visually verify, then commit**

```bash
npm run dev  # verify both Sidebar and Contact still render correctly
git add src/data/links.ts src/panels/Sidebar.tsx src/sections/Contact.tsx
git commit -m "refactor: share pinned/contact links via single data module"
```

---

### Task 19: `<ActivityPane>` and `<LinksPane>`

**Files:**
- Create: `src/panels/ActivityPane.tsx`
- Create: `src/panels/LinksPane.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Implement `<ActivityPane>`**

```tsx
// src/panels/ActivityPane.tsx
import { projects } from "@/data/projects";
import { HatchBar } from "@/components/HatchBar";

export function ActivityPane() {
  // Top 3 projects by commit count, normalized to %.
  const sorted = [...projects]
    .filter((p) => typeof p.commits === "number")
    .sort((a, b) => (b.commits ?? 0) - (a.commits ?? 0))
    .slice(0, 3);
  const max = sorted[0]?.commits ?? 1;

  return (
    <section className="p-3 border-b md:border-b-0 md:border-r border-border bg-surface-1">
      <div className="text-accent text-xs tracking-widest mb-3 border-b border-accent inline-block pb-1">
        ★ ACTIVITY
      </div>
      <div className="space-y-2">
        {sorted.map((p) => (
          <HatchBar key={p.name} label={p.name} value={Math.round(((p.commits ?? 0) / max) * 100)} />
        ))}
      </div>
    </section>
  );
}
```

If the projects data does not have a `commits` field, fall back to hard-coded values (in code, not as a TODO). For example: `<HatchBar label="snaily" value={73} />` — three real labels with values 73, 41, 28. Keep the code self-contained.

- [ ] **Step 2: Implement `<LinksPane>`**

```tsx
// src/panels/LinksPane.tsx
import { Tree } from "@/components/Tree";
import { PINNED_LINKS } from "@/data/links";

interface LinksPaneProps {
  onOpenResume: () => void;
}

export function LinksPane({ onOpenResume }: LinksPaneProps) {
  return (
    <section className="p-3 bg-surface-1">
      <div className="text-accent text-xs tracking-widest mb-3 border-b border-accent inline-block pb-1">
        ★ LINKS
      </div>
      <Tree>
        {PINNED_LINKS.map((item, i) => {
          const isLast = i === PINNED_LINKS.length - 1;
          if (item.action === "open-resume") {
            return (
              <Tree.Item key={item.id} isLast={isLast} onClick={onOpenResume}>
                {item.label}
              </Tree.Item>
            );
          }
          return (
            <Tree.Item
              key={item.id}
              isLast={isLast}
              onClick={() => window.open(item.href, "_blank", "noopener")}
            >
              {item.label}
            </Tree.Item>
          );
        })}
      </Tree>
    </section>
  );
}
```

- [ ] **Step 3: Wire both into App, replacing the placeholder bottom panes**

In `src/app/App.tsx`, replace the placeholder bottom-pane `<section>` blocks with:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
  <ActivityPane />
  <LinksPane onOpenResume={() => setResumeOpen(true)} />
</div>
```

Add the imports:
```tsx
import { ActivityPane } from "@/panels/ActivityPane";
import { LinksPane } from "@/panels/LinksPane";
```

- [ ] **Step 4: Visually verify, then commit**

```bash
npm run dev  # verify activity bars + links list
git add src/panels/ActivityPane.tsx src/panels/LinksPane.tsx src/app/App.tsx
git commit -m "feat: add ActivityPane and LinksPane bottom panes"
```

---

## Phase 5 — Command palette

### Task 20: Command registry

**Files:**
- Create: `src/lib/commands.ts`
- Create: `src/lib/commands.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/commands.test.ts
import { buildCommands } from "./commands";

describe("buildCommands", () => {
  const ctx = {
    setActiveSection: vi.fn(),
    openResume: vi.fn(),
    openExternal: vi.fn(),
    clearInput: vi.fn(),
  };
  beforeEach(() => Object.values(ctx).forEach((fn) => fn.mockReset?.()));

  it("includes navigate commands for every section", () => {
    const cmds = buildCommands(ctx);
    const navIds = cmds.filter((c) => c.group === "navigate").map((c) => c.id);
    expect(navIds).toEqual(expect.arrayContaining(["about", "experience", "projects", "contact"]));
  });

  it("running 'projects' sets active section to projects", () => {
    const cmds = buildCommands(ctx);
    cmds.find((c) => c.id === "projects")!.run();
    expect(ctx.setActiveSection).toHaveBeenCalledWith("projects");
  });

  it("running 'resume' opens the resume dialog", () => {
    const cmds = buildCommands(ctx);
    cmds.find((c) => c.id === "resume")!.run();
    expect(ctx.openResume).toHaveBeenCalled();
  });

  it("includes a 'view <project>' command per project", () => {
    const cmds = buildCommands(ctx);
    const viewCmds = cmds.filter((c) => c.id.startsWith("view-"));
    expect(viewCmds.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run test, verify it fails**

```bash
npm run test:run -- src/lib/commands.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the registry**

```ts
// src/lib/commands.ts
import type { SectionId } from "@/app/routes";
import { projects } from "@/data/projects";
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

  const externalLinks = PINNED_LINKS.filter((l) => l.href);
  for (const link of externalLinks) {
    actions.push({
      id: `open-${link.id}`,
      label: `open ${link.label}`,
      hint: link.href,
      group: "action",
      run: () => ctx.openExternal(link.href!),
    });
  }

  for (const p of projects) {
    const slug = p.name.toLowerCase().replace(/\s+/g, "-");
    const href = p.deployment ?? p.repo;
    if (!href) continue;
    actions.push({
      id: `view-${slug}`,
      label: `view ${slug}`,
      hint: href,
      group: "action",
      run: () => ctx.openExternal(href),
    });
  }

  // Slot for easter-egg commands. Add new entries to `easterEggs` later.
  const easterEggs: Command[] = [];

  return [...navigate, ...actions, ...easterEggs];
}
```

If your `projects` data uses different field names (e.g. `repoUrl` vs `repo`), adjust the `href` pickup accordingly.

- [ ] **Step 4: Run test, verify it passes**

```bash
npm run test:run -- src/lib/commands.test.ts
```

Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/commands.ts src/lib/commands.test.ts
git commit -m "feat: build command registry with navigate + action commands"
```

---

### Task 21: `<CommandPrompt>` with cmdk

**Files:**
- Create: `src/panels/CommandPrompt.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Implement `<CommandPrompt>`**

```tsx
// src/panels/CommandPrompt.tsx
import { useState, useRef, useEffect } from "react";
import { Command } from "cmdk";
import { BlinkCursor } from "@/components/BlinkCursor";
import { buildCommands, type CommandContext } from "@/lib/commands";

interface CommandPromptProps extends CommandContext {}

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
```

- [ ] **Step 2: Wire `<CommandPrompt>` into App, replacing the footer placeholder**

In `src/app/App.tsx`, replace the placeholder `<footer>` block with:

```tsx
<CommandPrompt
  setActiveSection={setActiveSection}
  openResume={() => setResumeOpen(true)}
  openExternal={(href) => window.open(href, "_blank", "noopener")}
  clearInput={() => {}}
/>
```

Add the import:
```tsx
import { CommandPrompt } from "@/panels/CommandPrompt";
```

- [ ] **Step 3: Visually verify**

```bash
npm run dev
```

Expected: focusing the prompt opens the suggestion list above. Typing "exp" filters to "experience". Selecting it (Enter or click) navigates to the experience section. ⌘K (or Ctrl+K) opens the palette from anywhere. Esc closes.

- [ ] **Step 4: Commit**

```bash
git add src/panels/CommandPrompt.tsx src/app/App.tsx
git commit -m "feat: build CommandPrompt with cmdk; wire ⌘K shortcut"
```

---

## Phase 6 — Resume dialog

### Task 22: `<ResumeDialog>`

**Files:**
- Create: `src/components/ResumeDialog.tsx`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Look at the existing resume content (was in old `ResumeCvComponent`). Since we wiped the old file, we need to reconstruct its content from `src/data/experience.ts` plus the basic profile info.**

The dialog renders: name, title, contact summary, then the experience timeline, then a download button.

- [ ] **Step 2: Implement `<ResumeDialog>` using shadcn `<Dialog>`**

```tsx
// src/components/ResumeDialog.tsx
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { experience } from "@/data/experience";
import { PINNED_LINKS } from "@/data/links";
import dayjs from "dayjs";
import { Download } from "lucide-react";

interface ResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResumeDialog({ open, onOpenChange }: ResumeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface-1 border border-border text-text font-mono max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogTitle className="text-accent text-lg">~/resume.pdf</DialogTitle>

        <section className="border-t border-border pt-4 space-y-1">
          <div className="text-text">gary rivera</div>
          <div className="text-text-muted text-sm">software engineer · ny</div>
          <div className="text-text-dim text-xs space-x-3 mt-2">
            {PINNED_LINKS.filter((l) => l.href).map((l) => (
              <a key={l.id} href={l.href} target="_blank" rel="noopener" className="hover:text-accent">
                {l.label}
              </a>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-4 mt-4">
          <h2 className="text-accent text-sm tracking-widest mb-2">// EXPERIENCE</h2>
          <ul className="space-y-3 text-sm">
            {experience.map((evt, i) => (
              <li key={i} className="grid grid-cols-[100px_1fr] gap-3">
                <span className="text-accent tabular-nums">{dayjs(evt.date).format("YYYY.MM")}</span>
                <div>
                  <div className="text-text">{evt.role} <span className="text-text-dim">@</span> <span className="text-text-muted">{evt.company}</span></div>
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
```

(The download link assumes a PDF at `public/resume.pdf`. If you don't have one yet, the link will 404 — that's OK; we'll add the PDF asset separately.)

- [ ] **Step 3: Replace the placeholder modal in App with `<ResumeDialog>`**

In `src/app/App.tsx`, replace the inline placeholder modal block with:

```tsx
<ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
```

Add the import:
```tsx
import { ResumeDialog } from "@/components/ResumeDialog";
```

- [ ] **Step 4: Add a `download-resume` command to the registry**

In `src/lib/commands.ts`, add to the `actions` array (after the project view commands):

```ts
actions.push({
  id: "download-resume",
  label: "download resume",
  hint: "/resume.pdf",
  group: "action",
  run: () => ctx.openExternal("/resume.pdf"),
});
```

Update the test in `src/lib/commands.test.ts` to verify:

```ts
it("includes a download-resume action command", () => {
  const cmds = buildCommands(ctx);
  expect(cmds.find((c) => c.id === "download-resume")).toBeDefined();
});
```

Run `npm run test:run -- src/lib/commands.test.ts` and verify all tests pass.

- [ ] **Step 5: Visually verify**

Run `npm run dev`. Click `resume.pdf` in the sidebar — dialog opens. Press Esc — dialog closes. Run `resume` in the command palette — dialog opens. Run `download-resume` — triggers the file download (or 404 if no PDF yet).

- [ ] **Step 6: Commit**

```bash
git add src/components/ResumeDialog.tsx src/app/App.tsx src/lib/commands.ts src/lib/commands.test.ts
git commit -m "feat: build ResumeDialog and download-resume command"
```

---

## Phase 7 — Boot, mobile, polish

### Task 23: Wire boot sequence into App with sessionStorage gating

**Files:**
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Update App to gate first-paint on the boot sequence**

Replace `src/app/App.tsx` with:

```tsx
// src/app/App.tsx
import { useEffect, useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Sidebar } from "@/panels/Sidebar";
import { MainPanel } from "@/panels/MainPanel";
import { ActivityPane } from "@/panels/ActivityPane";
import { LinksPane } from "@/panels/LinksPane";
import { CommandPrompt } from "@/panels/CommandPrompt";
import { ResumeDialog } from "@/components/ResumeDialog";
import { BootSequence } from "@/components/BootSequence";

const BOOT_KEY = "tui:boot-complete";

export function App() {
  const { activeSection, setActiveSection } = useActiveSection();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [bootComplete, setBootComplete] = useState(() =>
    typeof window !== "undefined" && sessionStorage.getItem(BOOT_KEY) === "1"
  );

  useEffect(() => {
    if (bootComplete) sessionStorage.setItem(BOOT_KEY, "1");
  }, [bootComplete]);

  if (!bootComplete) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-start">
        <BootSequence onComplete={() => setBootComplete(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-mono animate-[fade-in_300ms_ease-out]">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-0">
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenResume={() => setResumeOpen(true)}
        />

        <div className="flex flex-col min-h-0">
          <MainPanel activeSection={activeSection} bootComplete={bootComplete} />
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            <ActivityPane />
            <LinksPane onOpenResume={() => setResumeOpen(true)} />
          </div>
        </div>
      </div>

      <CommandPrompt
        setActiveSection={setActiveSection}
        openResume={() => setResumeOpen(true)}
        openExternal={(href) => window.open(href, "_blank", "noopener")}
        clearInput={() => {}}
      />

      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </div>
  );
}
```

- [ ] **Step 2: Add the `fade-in` keyframe to globals.css**

Append to `src/styles/globals.css`:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

- [ ] **Step 3: Visually verify**

Run `npm run dev`. Open the page in a fresh tab (or Incognito to bypass sessionStorage). Expected: 3-line boot sequence renders, fades, then the full layout fades in. Reload — boot is skipped (sessionStorage hit). Open Incognito — boot runs again. Press any key during boot — it skips.

- [ ] **Step 4: Commit**

```bash
git add src/app/App.tsx src/styles/globals.css
git commit -m "feat: gate first paint on skippable boot sequence with sessionStorage"
```

---

### Task 24: Mobile responsive pass

**Files:**
- Create: `src/panels/MobileSidebarDrawer.tsx`
- Modify: `src/app/App.tsx`, `src/panels/Sidebar.tsx`

- [ ] **Step 1: Create a mobile sidebar drawer using shadcn `<Dialog>` styled as a left sheet**

```tsx
// src/panels/MobileSidebarDrawer.tsx
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
```

- [ ] **Step 2: Update `App.tsx` to add a mobile header with hamburger and conditionally render desktop vs mobile sidebar**

Add a `useMediaQuery` hook first.

Create `src/hooks/useMediaQuery.ts`:

```ts
// src/hooks/useMediaQuery.ts
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}
```

Then update `src/app/App.tsx` — modify the JSX returned when `bootComplete === true` to include a mobile header and conditional sidebar:

```tsx
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MobileSidebarDrawer } from "@/panels/MobileSidebarDrawer";
import { Menu } from "lucide-react";

// inside App, after existing useState calls:
const isDesktop = useMediaQuery("(min-width: 768px)");
const [drawerOpen, setDrawerOpen] = useState(false);

// then the post-boot return:
return (
  <div className="min-h-screen flex flex-col bg-bg text-text font-mono animate-[fade-in_300ms_ease-out]">
    {!isDesktop && (
      <header className="flex items-center gap-3 px-4 py-2 border-b border-border bg-surface-1">
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="open menu"
          className="text-text-muted hover:text-accent"
        >
          <Menu size={18} />
        </button>
        <div className="text-text text-sm">
          <span className="text-text-dim">~/</span>gary-rivera
        </div>
      </header>
    )}

    <div className="flex-1 grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-0">
      {isDesktop && (
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onOpenResume={() => setResumeOpen(true)}
        />
      )}

      <div className="flex flex-col min-h-0">
        <MainPanel activeSection={activeSection} bootComplete={bootComplete} />
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
          <ActivityPane />
          <LinksPane onOpenResume={() => setResumeOpen(true)} />
        </div>
      </div>
    </div>

    <CommandPrompt
      setActiveSection={setActiveSection}
      openResume={() => setResumeOpen(true)}
      openExternal={(href) => window.open(href, "_blank", "noopener")}
      clearInput={() => {}}
    />

    {!isDesktop && (
      <MobileSidebarDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenResume={() => setResumeOpen(true)}
      />
    )}

    <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
  </div>
);
```

- [ ] **Step 3: Visually verify at multiple widths**

Run `npm run dev`. Use Chrome DevTools device emulation:
- 1440px wide: 3-zone grid (sidebar + main + bottom panes side-by-side)
- 1024px wide: same as desktop
- 768px wide (just under): mobile header with hamburger; sidebar hidden; main panel full width; bottom panes stacked vertically; command prompt sticky at bottom
- 375px wide (iPhone SE): same mobile layout, drawer opens via hamburger

Tap-target check on mobile: every Tree.Item is at least 32px tall (already covered by `font-mono text-sm leading-6` plus padding — verify visually).

- [ ] **Step 4: Commit**

```bash
git add src/panels/MobileSidebarDrawer.tsx src/hooks/useMediaQuery.ts src/app/App.tsx
git commit -m "feat: mobile responsive — hamburger drawer + stacked panels under 768px"
```

---

### Task 25: Polish — focus rings, scrollbar, hover states, lint clean

**Files:**
- Modify: `src/styles/globals.css`
- Modify: any components with missing focus states

- [ ] **Step 1: Add visible focus styles for keyboard users**

Append to `src/styles/globals.css`:

```css
:focus-visible {
  outline: none;
  box-shadow: inset 0 -2px 0 var(--color-accent);
}
button:focus-visible,
a:focus-visible {
  box-shadow: inset 0 -2px 0 var(--color-accent);
}
input:focus-visible,
[cmdk-input]:focus-visible {
  box-shadow: none;
}
```

- [ ] **Step 2: Add `tabIndex={0}` to clickable Tree.Items so keyboard users can focus them**

In `src/components/Tree.tsx`, update `TreeItem` to include `tabIndex={onClick ? 0 : -1}` and an `onKeyDown` handler that triggers `onClick` for Enter/Space:

```tsx
function TreeItem({ children, isLast = false, active = false, indent = 0, onClick, className }: TreeItemProps) {
  const glyph = isLast ? "└" : "├";
  const pad = " ".repeat(indent * 2);
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
```

Re-run Tree tests to make sure they still pass:

```bash
npm run test:run -- src/components/Tree.test.tsx
```

Expected: PASS.

- [ ] **Step 3: Run the full test suite**

```bash
npm run test:run
```

Expected: all tests PASS.

- [ ] **Step 4: Lint clean**

```bash
npm run lint
```

Expected: no errors. If there are warnings, fix them.

- [ ] **Step 5: Type-check via build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 6: Final visual QA in browser**

```bash
npm run dev
```

Walk through the full experience:
- [ ] Boot sequence renders on first load (use Incognito or clear sessionStorage)
- [ ] Boot is skippable with any key
- [ ] Layout fades in after boot
- [ ] About section types out "gary r." with cursor blink
- [ ] Sidebar nav clicks update both URL hash and main panel
- [ ] Browser back/forward buttons navigate sections
- [ ] Pinned > resume.pdf opens dialog
- [ ] Pinned > github/linkedin/email open in new tab
- [ ] Activity bars render with diagonal hatch
- [ ] Links pane shows the same items as Sidebar pinned
- [ ] Command prompt focuses on click; ⌘K opens from anywhere
- [ ] Typing "exp" filters to "experience"; Enter selects
- [ ] Typing "view" shows all project view commands
- [ ] Esc closes the palette
- [ ] Mobile (Chrome devtools, iPhone SE 375px): hamburger opens drawer; selecting an item closes drawer and updates main panel; bottom panes stack vertically; prompt sticky
- [ ] Tab key reveals teal focus underline on focusable elements
- [ ] No console errors

- [ ] **Step 7: Commit polish**

```bash
git add src/styles/globals.css src/components/Tree.tsx
git commit -m "polish: focus rings, keyboard support on tree items, lint clean"
```

---

### Task 26: Open the PR (draft)

**Files:** none (git operation only).

- [ ] **Step 1: Push the branch**

```bash
git push -u origin overhaul/terminal-ui
```

- [ ] **Step 2: Open a draft PR**

Use the `pr-creator` skill or run:

```bash
gh pr create --draft --title "Terminal UI overhaul" --body "$(cat <<'EOF'
## Summary
- Rebuilds the portfolio as a multi-panel TUI on Tailwind v4 + shadcn
- Replaces Chakra UI / Emotion with Tailwind tokens + shadcn primitives
- Adds command palette via cmdk; ⌘K shortcut
- New "Teal Curfew" palette, Geist Mono everywhere, dark-only

## Test plan
- [ ] Boot sequence runs on first load, skippable
- [ ] All four sections render and are reachable via clicks + commands
- [ ] Mobile drawer + stacked panels under 768px
- [ ] Lint + typecheck + tests all green

## Spec
docs/superpowers/specs/2026-05-06-terminal-ui-overhaul-design.md

## Plan
docs/superpowers/plans/2026-05-06-terminal-ui-overhaul.md

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Leave the PR in draft until you've shipped any remaining content tweaks (resume PDF, real handles, etc.) and decide to merge.

---

## Out of scope (deliberately deferred)

- **Easter-egg commands** — registry slot exists in `src/lib/commands.ts` (`easterEggs: Command[] = []`). Adding `whoami`, `ls`, `sudo hire-me`, `vim` later is a one-file change with no architectural impact.
- **Experience "cards" sub-view** — the spec mentioned an alternate "cards" layout for `<Experience>` accessible via a sub-tab. Not implemented in this plan; only the timeline view ships. Adding it later means adding a `<Tabs>` wrapper around the section and a second component.
- **GitHub API integration** — `useGitHub` hook is preserved in `src/hooks/useGitHub.ts` but not wired into the UI. Could surface live commit data in `<ActivityPane>` later.
- **`useCommandPalette` hook** — the spec described this as a hook; the plan implements the same logic as a `buildCommands(ctx)` function in `src/lib/commands.ts` consumed inline in `<CommandPrompt>`. One less file, same behavior.
- **Section-change opacity fade** — described as "optional" in the spec; omitted to keep transitions instant per the Quiet motion choice.
- **Light mode** — explicitly dropped. Adding it later would require revisiting palette tokens.
- **Analytics, SEO og-image, sitemap** — not part of this overhaul.

---

## Notes for the implementing engineer

- **Each task ends with a commit.** Don't batch.
- **Keep `npm run dev` open in a side terminal** from Task 11 onward and visually verify each subsequent task as you build it.
- **If a data file (`projects.ts`, `experience.ts`) has fields with different names than this plan assumes, adjust the rendering code in place** — don't restructure the data files. The plan was written before reading those files in detail.
- **shadcn primitives may include their own opinionated styles** (e.g. rounded corners, drop shadows). Override aggressively in the component files under `src/components/ui/` — set `rounded-none`, remove shadows, replace focus-rings with our teal underline.
- **cmdk's default behavior** (filtering, keyboard navigation) is intentionally preserved. Don't fight it.
- **Framer Motion** is only imported in `BootSequence.tsx` and `TypingText.tsx`. Don't reach for it elsewhere — CSS handles every other transition.
