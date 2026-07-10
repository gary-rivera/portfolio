import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";

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

const BUILD_DATE = resolveLastPushed();

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), tailwindcss()],
	define: {
		__REPO_LAST_PUSHED__: JSON.stringify(BUILD_DATE),
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		sourcemap: false,
	},
});
