import { Box, chakra, Flex } from "@chakra-ui/react";

function TopBar() {
	return (
		<Flex
			as="nav"
			justify="space-between"
			align="center"
			pb="0.5rem"
			mb="1.5rem"
			borderBottom="1px dashed"
			borderColor="rule"
			fontSize="11px"
			color="textMuted"
			textTransform="lowercase"
			letterSpacing="0.04em"
		>
			<Flex gap="1.5rem" align="center">
				<chakra.span color="phosphor">~/gary.rivera</chakra.span>
				<chakra.span color="textSubtle">· portfolio · main</chakra.span>
			</Flex>
			<Flex gap="1.5rem" align="center">
				<chakra.span color="textSubtle">
					[ <chakra.span color="textMuted">light</chakra.span> ·{" "}
					<chakra.b color="text" fontWeight="700">
						DARK
					</chakra.b>{" "}
					]
				</chakra.span>
				<Flex gap="0.4rem" align="center">
					<Box
						w="6px"
						h="6px"
						bg="phosphor"
						borderRadius="full"
						boxShadow="0 0 6px var(--phosphor)"
						animation="phosphor-pulse 1.6s ease-in-out infinite"
					/>
					<chakra.span>online · {new Date().toISOString().slice(0, 10)}</chakra.span>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default TopBar;
