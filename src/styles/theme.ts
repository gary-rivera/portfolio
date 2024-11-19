import { createSystem, defaultConfig, defineConfig, defineRecipe } from "@chakra-ui/react";

const EventCardRecipe = defineRecipe({
	base: {
		w: "auto",

		bg: ["blue.100", "red.200", "yellow.200", "var(--primary-bg-color)"], // TODO: add to css global variables
		h: "100%",
		borderRadius: "5px",
		// py: 3,
		py: [0.5, 1.5, 3],
		px: 5,
		flexDirection: "column",
		justifyContent: "center",
		fontSize: "24px",
		// border: "1px solid red",
	},
	variants: {
		category: {
			milestone: {},
			achievement: {
				// variant: "elevated",
				// borderColor: "blue.200",
				// h: "-moz-min-content",
				// m: 0,
				// fontSize: "2xs",
			},
			impact: {
				// borderColor: "blue.200",
			},
		},
	},
});

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
