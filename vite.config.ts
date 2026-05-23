import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Build-time stamp shown as "// updated <date>" in the status console.
// Was previously a live GitHub API call that blocked the build; now a deterministic local date.
const BUILD_DATE = new Date().toISOString().slice(0, 10);

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
