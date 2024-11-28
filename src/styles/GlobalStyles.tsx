import { Global } from "@emotion/react";

const GlobalStyles = () => {
	return (
		<Global
			styles={{
				"html, body": {
					margin: 0,
					padding: 0,
					minHeight: "auto",
					scrollbarWidth: "none",
					scrollbarColor: "red",
					color: "black",
					fontFamily: "Inter Variable",
				},
				":root": {
					position: "relative",
					backgroundColor: "#faedd0",
					color: "black",
					WebkitFontSmoothing: "antialiased",
					MozOsxFontSmoothing: "grayscale",
					"--primary-bg-color": "rgba(0, 0, 0, 0.035)",
					"--primary-blue": "rgb(8, 145, 178)",
					"--secondary-bg-color": "rgba(173, 216, 230, 1)",
				},
				":root::before": {
					position: "absolute",
					width: "-webkit-fill-available",
					height: "-webkit-fill-available",
					content: '""',
					backgroundImage:
						"linear-gradient(to right, var(--secondary-bg-color) 1px, transparent 2px), linear-gradient(to bottom, var(--secondary-bg-color) 1px, transparent 2px)",
					backgroundSize: "25px 25px",
					filter: "blur(0.05rem) opacity(0.5)",
				},
			}}
		/>
	);
};

export default GlobalStyles;
