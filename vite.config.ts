import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths(), tailwindcss()],
	build: {
		outDir: "dist", // Specifies the output directory
		emptyOutDir: true, // Clears the output directory before each build
		sourcemap: true, // Generates source maps for easier debugging
	},
});
