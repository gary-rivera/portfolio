import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RuioWrapper from "ruio";
import { ProjectsProvider } from "./context/ProjectsContext";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/styles/theme.ts";
import { ColorModeProvider } from "@/components/ui/color-mode";
import GlobalStyles from "@/styles/GlobalStyles";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RuioWrapper>
			<ChakraProvider value={system}>
				<GlobalStyles />
				<ColorModeProvider>
					<ProjectsProvider>
						<App />
					</ProjectsProvider>
				</ColorModeProvider>
			</ChakraProvider>
		</RuioWrapper>
	</StrictMode>,
);
