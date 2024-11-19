import { ReactNode } from "react";
import { Box, Flex, HStack, VStack, Link, Text, Icon, Heading, chakra, Image, Spacer } from "@chakra-ui/react";
import Tippy from "@tippyjs/react";
import LinkIcon from "@/components/ui/chakra-fixes/LinkIconFactory";
import { FaExternalLinkAlt } from "react-icons/fa";

import { tooltipConfig } from "@/utils/tooltipConfig";
import "tippy.js/dist/tippy.css";
import "@/styles/tooltipStyles.css";

interface TooltipContentProps {
	icon?: React.ReactNode;
	heading?: string;
	text?: string;
	iconLinkUrl?: string;
	// iconLinkUrl?: React.ReactNode;
}

interface ActionableTextHighlightProps {
	children: React.ReactNode;
	linkProps?: React.ComponentProps<typeof Link>;
	externalLink?: string;
	tooltipContent?: TooltipContentProps;
}

const ExternalLinkIcon = chakra(FaExternalLinkAlt);

function ActionableTextHighlight({ children, linkProps, externalLink, tooltipContent }: ActionableTextHighlightProps) {
	const sharedStyles = {
		color: "blackAlpha.900",
		textDecoration: "underline",
		textDecorationStyle: "dotted",
		textDecorationThickness: "0.16rem",
		textDecorationColor: "rgba(161,161,170)",
		textUnderlineOffset: "0.2rem",
		fontWeight: "700",
		_hover: {
			textDecorationColor: "var(--primary-blue)",
			// bg: "blackAlpha.50",
			color: "blackAlpha.700",
			textDecorationThickness: "0.18rem",
			textUnderlineOffset: "0.25rem",
		},
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
							<Flex m="1" w="auto" direction="column" fontSize="16px" color="whiteAlpha.900">
								{tooltipContent.icon && (
									<HStack h="25px" gap="0.5">
										{tooltipContent.icon}
										<Heading fontSize="0.9rem" mx="0" px="0">
											{tooltipContent.heading}
										</Heading>
										<Spacer />
										{tooltipContent.iconLinkUrl?.length && (
											<LinkIcon
												iconProps={{
													mb: "2px",
													href: tooltipContent.iconLinkUrl || "",
													target: "_blank",
													rel: "noopener noreferrer",
													color: "whiteAlpha.600",
													_hover: { color: "whiteAlpha.800" },
												}}
												IconTemplate={<ExternalLinkIcon boxSize="0.75rem" />}
											/>
										)}
									</HStack>
								)}
								{tooltipContent.text && (
									<Text fontSize="0.75rem" fontWeight="normal" textAlign="start" mb="1.5">
										{tooltipContent.text}
									</Text>
								)}
							</Flex>
						)
					}
					// visible={true} // debugging prop
					interactive={true}
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
