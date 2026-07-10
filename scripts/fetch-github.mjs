import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const REGISTRY_PATH = resolve(ROOT, "src/data/projects.registry.json");
const OUT_PATH = resolve(ROOT, "src/data/projects.generated.json");
const GH_USERNAME = "gary-rivera";

// Minimal .env loader (no dependency). Only sets vars not already present.
function loadDotEnv() {
  const envPath = resolve(ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2].trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}

function keepExistingOrEmpty(reason) {
  if (existsSync(OUT_PATH)) {
    console.warn(`[fetch-github] ${reason} — reusing existing ${OUT_PATH}`);
  } else {
    writeFileSync(OUT_PATH, "{}\n");
    console.warn(`[fetch-github] ${reason} — no cache; wrote empty ${OUT_PATH}`);
  }
}

const sanitizeAlias = (n) => "r_" + n.replace(/[^a-zA-Z0-9_]/g, "_");

async function main() {
  loadDotEnv();
  const token = process.env.GH_API_TOKEN;
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
  const repoNames = Object.keys(registry);

  if (!token) return keepExistingOrEmpty("GH_API_TOKEN not set");

  const parts = repoNames
    .map(
      (n) => `
    ${sanitizeAlias(n)}: repository(owner: "${GH_USERNAME}", name: "${n}") {
      name
      description
      url
      homepageUrl
      createdAt
      pushedAt
      stargazerCount
      languages(first: 5) { edges { node { name } } }
      repositoryTopics(first: 8) { edges { node { topic { name } } } }
      defaultBranchRef { target { ... on Commit { history { totalCount } } } }
    }`,
    )
    .join("\n");
  const query = `query { ${parts} }`;

  let json;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `bearer ${token}` },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) return keepExistingOrEmpty(`GitHub GraphQL HTTP ${res.status}`);
    json = await res.json();
  } catch (err) {
    return keepExistingOrEmpty(`fetch failed: ${err?.message ?? err}`);
  }

  if (json.errors?.length) {
    console.warn("[fetch-github] GraphQL errors:", JSON.stringify(json.errors));
  }
  if (!json.data) return keepExistingOrEmpty("GraphQL: no data");

  const out = {};
  for (const n of repoNames) {
    const node = json.data[sanitizeAlias(n)];
    if (!node) continue; // repo missing/renamed — merge falls back to registry
    out[n] = {
      name: node.name ?? n,
      description: node.description ?? null,
      url: node.url ?? null,
      homepageUrl: node.homepageUrl ?? null,
      createdAt: node.createdAt ?? null,
      pushedAt: node.pushedAt ?? null,
      stargazerCount: node.stargazerCount ?? 0,
      totalCommits: node.defaultBranchRef?.target?.history?.totalCount,
      topics: (node.repositoryTopics?.edges ?? []).map((e) => e.node.topic.name),
      languages: (node.languages?.edges ?? []).map((e) => e.node.name),
    };
  }
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`[fetch-github] wrote ${Object.keys(out).length} repos → ${OUT_PATH}`);
}

main().catch((err) => keepExistingOrEmpty(`unexpected: ${err?.message ?? err}`));
