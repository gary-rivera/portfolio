import { Fragment } from "react";
import Name from "./NameTypingEffect";
import { Box, chakra, Flex, Text } from "@chakra-ui/react";

type MetaEntry = { k: string; v: string; note?: string; accent?: boolean };
type ContactEntry = { k: string; v: string; href: string };

const META: MetaEntry[] = [
	{ k: "handle", v: "gary-rivera", accent: true },
	{ k: "location", v: "40.6782°N · 73.9442°W", note: "// brooklyn, ny" },
	{ k: "last_commit", v: "2h ago", note: "// portfolio · main · 4f3a2c1" },
	{ k: "status", v: "● open", accent: true, note: "// senior backend / platform" },
	{ k: "uptime", v: "5y 84d", note: "// since rithm school graduation" },
];

const CONTACT: ContactEntry[] = [
	{ k: "email", v: "gary@…", href: "mailto:a.gary.rivera@gmail.com" },
	{ k: "github", v: "gary-rivera", href: "https://github.com/gary-rivera" },
	{ k: "linkedin", v: "gary-a-rivera", href: "https://www.linkedin.com/in/gary-a-rivera/" },
	{ k: "cv", v: "resume.pdf", href: "#resume" },
];

function MainHeader() {
	return (
		<Flex as="header" direction="column" gap="1.5rem" align="stretch" pt={["1.5rem", "3rem"]}>
			<Name />

			<Box
				as="dl"
				display="grid"
				gridTemplateColumns="140px 1fr"
				rowGap="0.4rem"
				columnGap="1.5rem"
				fontSize="13px"
				mt="0.5rem"
			>
				{META.map(({ k, v, note, accent }) => (
					<Fragment key={k}>
						<Box as="dt" color="textSubtle">
							{k}
						</Box>
						<Box as="dd" color="text">
							<chakra.span color={accent ? "phosphor" : "text"}>{v}</chakra.span>
							{note && (
								<chakra.span color="textSubtle" ml="0.5rem">
									&nbsp;{note}
								</chakra.span>
							)}
						</Box>
					</Fragment>
				))}
			</Box>

			<Text color="textMuted" fontSize="13.5px" maxW="70ch" lineHeight="1.6">
				<chakra.span color="text">engineer.</chakra.span> bootcamp-to-senior arc, three years on the backend at a
				fintech that got acquired. shipped infra nobody throws launch parties for. off-hours:{" "}
				<chakra.span color="text">i solder mechanical keyboards</chakra.span>. ask me about either.
			</Text>

			<Box
				id="contact-header"
				display="grid"
				gridTemplateColumns={["repeat(2, 1fr)", "repeat(4, max-content)"]}
				gap="1.25rem 2rem"
				py="0.75rem"
				borderTop="1px dashed"
				borderBottom="1px dashed"
				borderColor="rule"
				fontSize="12px"
			>
				{CONTACT.map(({ k, v, href }) => (
					<Flex key={k} direction="column" gap="0.15rem">
						<chakra.span color="textSubtle" fontSize="10px" letterSpacing="0.08em">
							{k}
						</chakra.span>
						<chakra.a
							href={href}
							target={href.startsWith("http") ? "_blank" : undefined}
							rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
							color="text"
							fontSize="13px"
							transition="color 160ms var(--ease-out)"
							_hover={{ color: "phosphor" }}
						>
							{v}
						</chakra.a>
					</Flex>
				))}
			</Box>
		</Flex>
	);
}

export default MainHeader;
