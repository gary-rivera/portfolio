import { useEffect, useRef, useState } from "react";
import { Box, chakra, Flex } from "@chakra-ui/react";

const ITEMS = [
	{ k: "email", v: "gary@…", href: "mailto:a.gary.rivera@gmail.com" },
	{ k: "github", v: "gary-rivera", href: "https://github.com/gary-rivera" },
	{ k: "linkedin", v: "gary-a-rivera", href: "https://www.linkedin.com/in/gary-a-rivera/" },
	{ k: "cv", v: "resume.pdf", href: "#resume" },
] as const;

function StickyContact() {
	const [visible, setVisible] = useState(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const target = document.getElementById("contact-header");
		if (!target || typeof IntersectionObserver === "undefined") return;

		observerRef.current = new IntersectionObserver(
			([entry]) => {
				setVisible(!entry.isIntersecting);
			},
			{ threshold: 0, rootMargin: "0px 0px -40px 0px" },
		);
		observerRef.current.observe(target);

		return () => {
			observerRef.current?.disconnect();
		};
	}, []);

	return (
		<Box
			aria-hidden={!visible}
			position="fixed"
			top="50%"
			right="max(1.5rem, calc((100vw - 1080px) / 2 + 1.5rem))"
			transform={visible ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(12px)"}
			opacity={visible ? 1 : 0}
			pointerEvents={visible ? "auto" : "none"}
			transition="opacity 380ms var(--ease-out), transform 420ms var(--ease-out)"
			zIndex={5}
			bg="rgba(15, 19, 16, 0.78)"
			backdropFilter="blur(6px)"
			px="1rem"
			pt="0.85rem"
			pb="1rem"
			w="200px"
			borderTop="1px dashed"
			borderRight="1px dashed"
			borderBottom="1px dashed"
			borderColor="phosphorDim"
			boxShadow="0 0 0 1px rgba(15, 19, 16, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)"
			fontFamily="mono"
			fontSize="11px"
			color="textMuted"
			display={["none", "none", "block"]}
			css={{
				"@media (prefers-reduced-motion: reduce)": {
					transform: "translateY(-50%)",
					transition: "opacity 200ms ease",
				},
				"@media (max-width: 1100px)": { display: "none" },
			}}
		>
			<chakra.div
				position="absolute"
				top="-0.85rem"
				left="-1px"
				bg="bg"
				px="0.5rem"
				fontSize="10px"
				letterSpacing="0.06em"
				color="phosphor"
			>
				<chakra.span color="phosphorDim">~ </chakra.span>contact.bind
			</chakra.div>

			<Box as="dl" display="grid" gap="0.55rem">
				{ITEMS.map(({ k, v, href }) => (
					<Box key={k}>
						<chakra.dt color="textSubtle" fontSize="10px" letterSpacing="0.08em" mb="0.05rem">
							{k}
						</chakra.dt>
						<chakra.dd fontSize="12px">
							<chakra.a
								href={href}
								target={href.startsWith("http") ? "_blank" : undefined}
								rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
								color="text"
								borderBottom="1px dotted transparent"
								pb="1px"
								transition="color 140ms var(--ease-out), border-color 140ms var(--ease-out)"
								_hover={{ color: "phosphor", borderColor: "phosphorDim" }}
							>
								{v}
							</chakra.a>
						</chakra.dd>
					</Box>
				))}
			</Box>

			<Flex
				mt="0.85rem"
				pt="0.65rem"
				borderTop="1px dashed"
				borderColor="rule"
				align="center"
				gap="0.5rem"
				color="textSubtle"
				fontSize="10px"
				letterSpacing="0.04em"
			>
				<Box
					w="6px"
					h="6px"
					bg="phosphor"
					borderRadius="full"
					boxShadow="0 0 6px var(--phosphor)"
					animation="phosphor-pulse 1.6s ease-in-out infinite"
				/>
				<span>online · open to work</span>
			</Flex>
		</Box>
	);
}

export default StickyContact;
