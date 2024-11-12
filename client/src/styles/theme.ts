import { createSystem, defaultBaseConfig, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

const EventCardRecipe = defineRecipe({
	base: {
		w: "auto",
		bg: "rgba(0, 0, 0, 0.035)",
		// bg: "rgba(12,92, 114, 0.05)",
		h: "100%",
		// borderColor: "rgba(12,92, 114, 0.2)",
		borderRadius: "5px",
		py: 2,
		px: 4,
	},
	variants: {
		category: {
			milestone: {
				borderColor: "blue.200",
			},
			achievement: {
				variant: "elevated",
				// bg: "yellow.400",
				borderColor: "blue.200",

				// w: "-moz-min-content",
				h: "-moz-min-content",
				m: 0,
				fontSize: "2xs",
			},
			impact: {
				borderColor: "blue.200",
			},
		},
	},
});

const customScrollBar = defineRecipe({});

const customConfig = defineConfig({
	// ...defaultBaseConfig,
	theme: {
		tokens: {
			colors: {},
		},
		recipes: {
			eventCard: EventCardRecipe,
		},
	},
	cssVarsRoot: ":where(:root, :host)",
});

export const system = createSystem(defaultConfig, customConfig);
