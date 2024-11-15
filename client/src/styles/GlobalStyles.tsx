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
					backgroundColor: "#faedd0", // Static background color
					color: "black", // Static text color
					WebkitFontSmoothing: "antialiased",
					MozOsxFontSmoothing: "grayscale",
					"--primary-bg-color": "rgba(0, 0, 0, 0.035)", // Static primary background color
					"--primary-blue": "rgb(8, 145, 178)",
					// "--primary-blue": "rgba(8, 145, 178, 0.4)",
					"--secondary-bg-color": "rgba(173, 216, 230, 1)", // Static secondary color
					"--bg-pattern": "url('https://www.toptal.com/designers/subtlepatterns/uploads/ep_naturalwhite.png')", // Static background pattern
					"--bg-filter": "opacity(50%) blur(0.01rem)", // Static filter
				},
				":root::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundImage: "var(--bg-pattern)",
					backgroundSize: "auto",
					backgroundPosition: "center",
					zIndex: -2,
					filter: "var(--bg-filter)",
					pointerEvents: "none",
				},
				":root::after": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					opacity: 0.5,
					zIndex: -1,
					backgroundImage:
						"linear-gradient(to right, var(--secondary-bg-color) 1px, transparent 1px), linear-gradient(to bottom, var(--secondary-bg-color) 1px, transparent 1px)",
					filter: "blur(0.04rem)",
					backgroundSize: "25px 25px",
					pointerEvents: "none",
				},
			}}
		/>
	);
};

export default GlobalStyles;
