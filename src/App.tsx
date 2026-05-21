import { Box, Flex, chakra } from "@chakra-ui/react";
import MainHeader from "./components/header/MainHeader";
import AcheivementsContainer from "./components/AcheivementsContainer";
import TopBar from "./components/TopBar";
import NowBlock from "./components/NowBlock";
import PromptBlock from "./components/PromptBlock";
import StickyContact from "./components/StickyContact";

function Footer() {
	return (
		<Flex
			as="footer"
			mt="3.5rem"
			pt="1rem"
			borderTop="1px dashed"
			borderColor="rule"
			color="textSubtle"
			fontSize="11px"
			justify="space-between"
			align="center"
			wrap="wrap"
			gap="0.5rem"
		>
			<chakra.span>nyc · et · 40.6782°N 73.9442°W</chakra.span>
			<chakra.span color="textMuted">render: 0.41s · build: 4f3a2c1 · © {new Date().getFullYear()}</chakra.span>
		</Flex>
	);
}

function App() {
	return (
		<>
			<Box maxW="1080px" mx="auto" px={["1rem", "1.5rem", "2rem"]} py={["1.5rem", "2rem", "2rem"]} pb="4rem">
				<TopBar />
				<MainHeader />
				<NowBlock />
				<AcheivementsContainer />
				<PromptBlock />
				<Footer />
			</Box>
			<StickyContact />
		</>
	);
}

export default App;
