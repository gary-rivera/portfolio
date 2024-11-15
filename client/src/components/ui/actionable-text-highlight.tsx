import { Box, Flex, HStack, Link, Text, Icon, Heading, chakra, Image } from "@chakra-ui/react";
import Tippy from "@tippyjs/react";

import { tooltipConfig } from "@/utils/tooltipConfig";
import "tippy.js/dist/tippy.css";
import "@/styles/tooltipStyles.css";

interface TooltipContentProps {
	icon?: React.ReactNode;
	heading?: string;
	text?: string;
	linkIcon?: React.ReactNode;
}

interface ActionableTextHighlightProps {
	children: React.ReactNode;
	linkProps?: React.ComponentProps<typeof Link>;
	externalLink?: string;
	tooltipContent?: TooltipContentProps;
}

function ActionableTextHighlight({ children, linkProps, externalLink, tooltipContent }: ActionableTextHighlightProps) {
	const sharedStyles = {
		textDecoration: "underline",
		textDecorationStyle: "dotted",
		textDecorationThickness: "0.16rem",
		textDecorationColor: "gray",
		textUnderlineOffset: "0.2rem",
		fontWeight: "700",
		_hover: { textDecorationColor: "#0891b2" },
		_focus: {
			outline: "none",
			boxShadow: "none",
		},
		...(linkProps || {}),
	};
	return (
		<>
			{externalLink ? (
				<Link {...sharedStyles} href={externalLink} target="_blank" rel="noopener noreferrer">
					{children}
				</Link>
			) : (
				<Tippy
					content={
						tooltipContent && (
							<Flex m="1" w="auto" direction="column">
								{tooltipContent.icon && (
									<HStack>
										{tooltipContent.icon}
										{/* <Icon asChild>{tooltipContent.icon}</Icon> */}
										{/* <Image src={tooltipContent.icon} alt="project-logo" height="2rem" mt="1" /> */}
										<Heading size="md">{tooltipContent.heading}</Heading>
									</HStack>
								)}
								{tooltipContent.text && <Text textAlign="start">{tooltipContent.text}</Text>}
								{tooltipContent.linkIcon && (
									<HStack w="fit-content" alignSelf="end">
										{tooltipContent.linkIcon}
									</HStack>
								)}
							</Flex>
						)
					}
					// visible={true} // debugging prop
					{...tooltipConfig}
				>
					<chakra.span {...sharedStyles} {...(linkProps ? linkProps : {})}>
						{children}
					</chakra.span>
				</Tippy>
			)}
		</>
	);
}

export default ActionableTextHighlight;
