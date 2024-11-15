import { TippyProps } from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/shift-toward.css";
import "tippy.js/animations/perspective.css";

export const tooltipConfig: Partial<TippyProps> = {
	theme: "dingle",
	// animation: "shift-away", // little generic imo
	// animation: "scale", // just enough umph without trying too hard
	animation: "perspective", // hella extra but i sorta like it
	arrow: true,
	delay: [100, 50] as [number | null, number | null],
	duration: [300, 200],
	// maxWidth: 200,
};
