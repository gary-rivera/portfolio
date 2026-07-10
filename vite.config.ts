import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

// Newest repo pushedAt from the baked GitHub data, shown as "// updated <date>" in
// the status console. Falls back to today's date if the file is missing/empty.
function resolveLastPushed(): string {
	const today = new Date().toISOString().slice(0, 10);
	try {
		const gen = JSON.parse(
			readFileSync(new URL("./src/data/projects.generated.json", import.meta.url), "utf8"),
		) as Record<string, { pushedAt?: string | null }>;
		const dates = Object.values(gen)
			.map((r) => r?.pushedAt)
			.filter((d): d is string => typeof d === "string" && d.length > 0)
			.sort();
		return dates.length ? dates[dates.length - 1].slice(0, 10) : today;
	} catch {
		return today;
	}
}

// Short commit SHA for the footer's build stamp. Falls back to "dev" when git
// isn't available (e.g. building from a tarball or shallow CI export).
function resolveGitSha(): string {
	try {
		return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
	} catch {
		return "dev";
	}
}

const BUILD_DATE = resolveLastPushed();
const GIT_SHA = resolveGitSha();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), tailwindcss()],
	define: {
		__REPO_LAST_PUSHED__: JSON.stringify(BUILD_DATE),
		__GIT_SHA__: JSON.stringify(GIT_SHA),
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: false,
	},
});
