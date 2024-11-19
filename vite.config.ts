import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), svgr()],
	build: {
		outDir: "dist", // Specifies the output directory
		emptyOutDir: true, // Clears the output directory before each build
		sourcemap: true, // Generates source maps for easier debugging
	},
});
