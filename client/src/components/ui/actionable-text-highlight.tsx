import { Link } from "@chakra-ui/react";

function ActionableTextHighlight({ children, linkProps, externalLink }) {
	return (
		<Link
			ml="0.5"
			textDecoration="underline"
			textDecorationStyle="dotted"
			textDecorationThickness="0.16rem"
			textDecorationColor="gray"
			textUnderlineOffset="0.2rem"
			fontSize="1.8rem"
			fontWeight="700"
			letterSpacing="tight"
			_hover={{ textDecorationColor: "#0891b2" }}
			_focus={{
				outline: "none",
				boxShadow: "none",
			}}
			{...(externalLink
				? {
						href: externalLink,
						target: "_blank",
						rel: "noopener noreferrer",
					}
				: {})}
		>
			{children}
		</Link>
	);
}

export default ActionableTextHighlight;
