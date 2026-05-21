import { Flex, HStack, Link, Text, Heading, chakra, Spacer } from "@chakra-ui/react";
import Tippy from "@tippyjs/react";
import LinkIcon from "@/components/LinkIconFactory";
import { FaExternalLinkAlt } from "react-icons/fa";

import { tooltipConfig } from "@/utils/tooltipConfig";
import "tippy.js/dist/tippy.css";
import "@/styles/tooltipStyles.css";

interface TooltipContentProps {
	icon?: React.ReactNode;
	heading?: string;
	text?: string;
	iconLinkUrl?: string;
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
		color: "textPrimary",
		fontWeight: "500",
		borderBottom: "1px solid",
		borderColor: "hairlineStrong",
		transition: "color 200ms var(--ease-out), border-color 200ms var(--ease-out)",
		_hover: {
			color: "accent",
			borderColor: "accent",
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
							<Flex m="1" w="auto" direction="column" fontFamily="var(--font-sans)" color="white">
								{tooltipContent.icon && (
									<HStack h="25px" gap="2">
										{tooltipContent.icon}
										<Heading fontSize="13px" fontWeight="500" m="0" p="0">
											{tooltipContent.heading}
										</Heading>
										<Spacer />
										{tooltipContent.iconLinkUrl?.length && (
											<LinkIcon
												iconProps={{
													href: tooltipContent.iconLinkUrl || "",
													target: "_blank",
													rel: "noopener noreferrer",
													color: "whiteAlpha.700",
													_hover: { color: "white" },
												}}
												IconTemplate={<ExternalLinkIcon boxSize="0.7rem" />}
											/>
										)}
									</HStack>
								)}
								{tooltipContent.text && (
									<Text fontSize="12px" fontWeight="400" color="whiteAlpha.800" mb="1" lineHeight="1.5">
										{tooltipContent.text}
									</Text>
								)}
							</Flex>
						)
					}
					interactive={true}
					{...tooltipConfig}
				>
					<chakra.span {...sharedStyles} cursor="default">
						{children}
					</chakra.span>
				</Tippy>
			)}
		</>
	);
}

export default ActionableTextHighlight;
