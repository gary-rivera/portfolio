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
					MozOsxFontSmoothing: "grayscale",
					"--primary-bg-color": "rgba(0, 0, 0, 0.035)",
					"--primary-blue": "rgb(8, 145, 178)",
					"--secondary-bg-color": "rgba(173, 216, 230, 1)",
					"--bg-pattern": "url('https://www.toptal.com/designers/subtlepatterns/uploads/ep_naturalwhite.png')",
					"--bg-filter": "opacity(20%) blur(0.01rem)",
				},
				":root::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
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
						"linear-gradient(to right, var(--secondary-bg-color) 1px, transparent 2px), linear-gradient(to bottom, var(--secondary-bg-color) 1px, transparent 2px)",
					filter: "blur(0.05rem)",
					backgroundSize: "25px 25px",
					pointerEvents: "none",
				},
			}}
		/>
	);
};

export default GlobalStyles;
