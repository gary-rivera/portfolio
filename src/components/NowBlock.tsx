import { Box, chakra, Flex } from "@chakra-ui/react";

const ITEMS: { text: string; meta?: string }[] = [
	{ text: "shipping the next cut of snaily", meta: "// repo · gary-rivera/flappy-js" },
	{ text: "soldering a 40% split keyboard", meta: "// build #04, fr4 plate, lubed switches" },
	{ text: "reading: the aws pricing docs, again", meta: "// for the third year running" },
	{ text: "open to: senior backend / platform roles", meta: "// nyc, remote, or remote-with-quarterly-onsites" },
];

function NowBlock() {
	return (
		<Box
			border="1px dashed"
			borderColor="rule"
			bg="rgba(123, 192, 137, 0.025)"
			px="1.25rem"
			py="1rem"
			my="1.5rem"
		>
			<chakra.div
				color="phosphor"
				fontSize="11px"
				letterSpacing="0.08em"
				mb="0.5rem"
			>
				/etc/now &nbsp;· updated by hand
			</chakra.div>
			<Box as="ul" listStyle="none" m="0" p="0" color="text" fontSize="13px">
				{ITEMS.map(({ text, meta }) => (
					<Flex
						as="li"
						key={text}
						pl="1.5rem"
						py="0.25rem"
						position="relative"
						gap="0.5rem"
						wrap="wrap"
					>
						<Box position="absolute" left="0" color="phosphor">
							→
						</Box>
						<chakra.span>{text}</chakra.span>
						{meta && (
							<chakra.span color="textSubtle" fontSize="11px">
								{meta}
							</chakra.span>
						)}
					</Flex>
				))}
			</Box>
		</Box>
	);
}

export default NowBlock;
