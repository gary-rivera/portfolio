import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProjectsProvider } from "@context/ProjectsContext";

import "@styles/app.css";

import App from "./App";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reducedMotion) {
	document.documentElement.classList.add("crt-boot");

	const sweep = document.createElement("div");
	sweep.className = "boot-sweep";

	document.body.appendChild(sweep);
	window.setTimeout(() => {
		document.documentElement.classList.remove("crt-boot");
		sweep.remove();
	}, 700);
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ProjectsProvider>
			<App />
		</ProjectsProvider>
	</StrictMode>,
);
