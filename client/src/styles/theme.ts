import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

const EventCardRecipe = defineRecipe({
	base: {
		w: "auto",
		bg: "rgba(0, 0, 0, 0.035)",
		h: "100%",
		borderRadius: "5px",
		py: 2,
		px: 4,
	},
	variants: {
		category: {
			milestone: {},
			achievement: {
				variant: "elevated",
				borderColor: "blue.200",
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
