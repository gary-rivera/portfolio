import { chakra } from "@chakra-ui/react";

const ASCII = ` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█
 ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`;

function Name() {
	return (
		<chakra.pre
			as="h1"
			margin="0"
			color="phosphor"
			fontFamily="mono"
			fontSize={["8px", "10px", "11px"]}
			lineHeight="1"
			fontWeight="500"
			whiteSpace="pre"
			overflowX="auto"
			letterSpacing="-0.02em"
			textShadow="0 0 12px rgba(123, 192, 137, 0.25)"
			aria-label="Gary Rivera"
		>
			{ASCII}
		</chakra.pre>
	);
}

export default Name;
