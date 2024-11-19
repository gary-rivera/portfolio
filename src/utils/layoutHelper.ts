// Reuse in ruio
export const halfWayLinesStyle = {
	position: "relative",
	width: "100%",
	height: "100%",
	"::before": {
		content: '""',
		position: "absolute",
		left: "50%",
		top: "0",
		bottom: "0",
		width: "1px",
		backgroundColor: "red",
		transform: "translateX(-50%)",
	},
	"::after": {
		content: '""',
		position: "absolute",
		top: "50%",
		left: "0",
		right: "0",
		height: "1px",
		backgroundColor: "green",
		transform: "translateY(-50%)",
	},
};

export const halfWayLinesChakraStyle = {
	position: "relative",

	_before: {
		content: '""',
		position: "absolute",
		left: "50%",
		top: "0",
		bottom: "0",
		w: "0.5px",
		bg: "red.500",
		transform: "translateX(-50%)",
	},
	_after: {
		content: '""',
		position: "absolute",
		top: "50%",
		left: "0",
		right: "0",
		h: "0.5px",
		bg: "green.500",
		transform: "translateY(-50%)",
	},
};
