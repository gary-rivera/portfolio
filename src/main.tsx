import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProjectsProvider } from "./context/ProjectsContext";

import "@/styles/app.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ProjectsProvider>
			<App />
		</ProjectsProvider>
	</StrictMode>,
);
