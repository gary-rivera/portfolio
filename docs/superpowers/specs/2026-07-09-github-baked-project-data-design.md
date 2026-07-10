# Design: GitHub-sourced project data, baked at build time

**Date:** 2026-07-09
**Status:** Approved
**Author:** Gary Rivera

## Problem

The portfolio's `projects.log` section renders project data from a hand-curated
static catalog (`src/data/projects.ts`) overlaid at runtime with live GitHub data
(commit counts, topics, `createdAt`, repo URL) fetched client-side via SWR.

Two blockers for production:

1. **Token exposure.** The GitHub GraphQL API requires authentication. The token is
   read via `import.meta.env.VITE_GH_API_TOKEN`. Anything prefixed `VITE_` is bundled
   into the public client JS, so the app ships a GitHub PAT to every visitor — or, with
   no token, the GraphQL calls fail entirely.
2. **Runtime fragility.** A GitHub outage or rate-limit degrades the live page, and the
   fetch adds a network round-trip plus loading/error states on every visit.

## Goal

Source project data directly from GitHub while keeping the token off the client and the
runtime resilient. Maximize GitHub as the data source; keep only what GitHub can't
provide (logos, npm links, curation) local.

## Approach

Replace the runtime client-side fetch with a **non-fatal build-time fetch** that bakes
GitHub data into a committed JSON file. The app renders that JSON synchronously — no
runtime token, no SWR, no loading/error states.

### Decision record (from brainstorming)

- **Hosting:** Vercel / Netlify (serverless available, but not used — see below).
- **Architecture:** Build-time bake (not a runtime serverless proxy). Portfolio data
  changes slowly; baking removes the token-exposure problem, makes the site faster and
  more robust, and is less code.
- **Data scope:** Maximize GitHub, minimize local. Descriptions come from GitHub with a
  local fallback so nothing renders blank.
- **Repo inclusion:** Explicit local registry keyed by repo name (logos are mandatory
  and can only live locally). The build fetches GitHub data for exactly those repos.
- **Generated JSON:** Committed to git (resilient fallback + real data in `npm run dev`
  without a token).
- **Daily auto-rebuild:** Out of scope for v1.

## Components

### 1. Secret handling

- Rename `VITE_GH_API_TOKEN` → `GH_API_TOKEN` (no `VITE_` prefix → never bundled into the
  client). Used only by the build script.
- Add `.env.example` documenting `GH_API_TOKEN`. Token scope: read-only public repos
  (classic PAT `public_repo`, or a fine-grained read-only token).
- Set `GH_API_TOKEN` in the Vercel/Netlify build environment.

### 2. Slim local registry — `src/data/projects.ts`

Keyed by repo name, holds only what GitHub can't/shouldn't provide:

- `logo` (current `logoConfig` tuple), `npm` link, optional `name` display override,
  optional `description` fallback, `active` flag, and implicit ordering.
- Drops `createdAt`, `totalCommits`, `tags`, repo `url`, and `deployment` — those come
  from GitHub (`deployment` ← `homepageUrl`, with local fallback).
- Retains `projectTagsConfig` and the tag-badge machinery unchanged.

### 3. Build script — `scripts/fetch-github.mjs`

Runs before `vite build`.

- Reads registry repo keys → GitHub GraphQL (existing query + `homepageUrl`,
  `stargazerCount`, `pushedAt`) → writes `src/data/projects.generated.json`
  (serializable GitHub fields only, keyed by repo name).
- **Non-fatal by design** (the `vite.config.ts` lesson: a prior build-time GitHub call
  "blocked the build"). On fetch failure or missing token, it keeps the existing
  committed JSON and warns. If none exists, it writes an empty map `{}`. The build never
  breaks because GitHub is down.
- `package.json`:
  - `"build": "node scripts/fetch-github.mjs && tsc -b && vite build"`
  - add `"fetch:github": "node scripts/fetch-github.mjs"` to refresh locally.

### 4. Merge layer — `src/data/getProjects.ts`

Combines the registry (logos/npm/overrides) with the generated JSON (GitHub fields) into
the `Project[]` the UI already consumes. GitHub-first, local fallback when a GitHub field
is empty (description, deployment). Keeps the existing `Project` type shape so
`ProjectCard` needs no changes.

### 5. App wiring cleanup

- Delete `src/services/api.ts` and `src/hooks/useGitHub.ts`; remove `swr` from
  `package.json` (used only by the deleted code).
- Simplify `ProjectsContext.tsx` to serve merged data synchronously (`isLoading`/
  `isError` always resolved false). No `useEffect`, no `useState` fetch cycle.
- Remove the now-dead loading/error branches in `ProjectsContainer.tsx`.

### 6. Optional nice-to-have

Feed the real newest `pushedAt` (max across repos, from the generated JSON) into
`__REPO_LAST_PUSHED__` instead of today's build date, so StatusConsole's "// updated"
line is honest. Low priority; can defer.

## Data flow

```
vite build
  └─ scripts/fetch-github.mjs  (GH_API_TOKEN, build env only)
       └─ src/data/projects.generated.json  (committed)
            └─ getProjects.ts  merges with  src/data/projects.ts (registry)
                 └─ ProjectsContext  →  ProjectsContainer  →  ProjectCard
```

Zero network at runtime. Zero token in the client bundle.

## Error handling

- **Build, no token / network down:** script warns, reuses committed JSON, build succeeds.
- **Build, no committed JSON and no token:** script writes `{}`; UI renders registry-only
  data (logos, names, npm links, fallback descriptions). Build succeeds.
- **Repo missing from GitHub response:** merge falls back to registry values for that repo.
- **Empty GitHub field (description/homepage):** merge falls back to local override.

## Testing / verification

1. Build with a valid `GH_API_TOKEN` → assert `projects.generated.json` is populated and
   cards show live commits, tags, and years.
2. Build with token unset / network blocked → build still succeeds and falls back to the
   committed JSON.
3. Grep the production bundle (`dist/`) to prove no token string is present.
4. `npm run dev` with no token renders real data from committed JSON.

## Out of scope

- Runtime serverless proxy.
- Daily/scheduled auto-rebuild for always-fresh commit counts (candidate follow-up).
- Topic-based repo auto-discovery.
- Sourcing logos or npm links from GitHub.
