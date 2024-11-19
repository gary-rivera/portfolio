import { Global } from "@emotion/react";

const GlobalStyles = () => {
	return (
		<Global
			styles={{
				"html, body": {
					height: "100%",
					margin: 0,
					padding: 0,
					minHeight: "auto",
					overflowY: "hidden",
					scrollbarWidth: "none",
					scrollbarColor: "red",
				},
				":root": {
					backgroundColor: "#faedd0",
					color: "black",
					WebkitFontSmoothing: "antialiased",
					// MozOsxFontSmoothing: "grayscale",
					"--primary-bg-color": "rgba(0, 0, 0, 0.035)", // Static primary background color
					"--primary-blue": "rgb(8, 145, 178)",
					"--secondary-bg-color": "rgba(173, 216, 230, 1)", // Static secondary color
					"--bg-pattern": "url('https://www.toptal.com/designers/subtlepatterns/uploads/ep_naturalwhite.png')", // Static background pattern
					backgroundImage: "var(--bg-pattern)",
					"background-blend-mode": "multiply",
					filter: "var(--bg-filter)",
					zIndex: 0,
				},
				":root::before": {
					backgroundColor: "#fffae1", // Static background color
					// backgroundColor: "#fff8d5", // Static background color
					// backgroundColor: "#FFFEF9", // Static background color
					// backgroundColor: "#FFFDF7", // Static background color

					"--bg-filter": "blur(0.05rem)", // Static filter
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					opacity: 0.55,
					width: "100%",
					height: "100%",
					backgroundSize: "auto",
					backgroundPosition: "center",
					zIndex: -2,
					pointerEvents: "none",
					// "background-blend-mode": "lighten",
				},
				":root::after": {
					// backgroundColor: "#faedd0", // Static background color

					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					opacity: 0.2,
					zIndex: 0,
					backgroundImage:
						"linear-gradient(to right, rgb(8,145,178) 1px, transparent 2px), linear-gradient(to bottom, rgb(8,145,178) 1px, transparent 2px)",
					filter: "blur(0.05rem)",
					backgroundSize: "25px 25px",
					pointerEvents: "none",
					// mixBlendMode: "darken",
				},
			}}
		/>
	);
};

export default GlobalStyles;
