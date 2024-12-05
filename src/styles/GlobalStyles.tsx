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
					content: '""',
					position: "absolute",
					width: "-webkit-fill-available",
					height: "-webkit-fill-available",
					backgroundImage: `
						linear-gradient(to right, var(--secondary-bg-color) 1px, transparent 1px),
						linear-gradient(to bottom, var(--secondary-bg-color) 1px, transparent 1px),
						linear-gradient(to right, var(--secondary-bg-color) 1px, transparent 2.5px),
						linear-gradient(to bottom, var(--secondary-bg-color) 1px, transparent 2.5px)
					`,
					backgroundSize: "25px 25px, 25px 25px, 100px 100px, 100px 100px",
					filter: "blur(0.05rem) opacity(0.5)",
				},
			}}
		/>
	);
};

export default GlobalStyles;
