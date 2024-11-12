import MainHeader from "./components/header/MainHeader";
import AcheivementsContainer from "./components/AcheivementsContainer";
// import ThemeToggleButton from './components/ThemeToggleButton';
import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Flex } from "@chakra-ui/react";
import "./App.css";
import { HStack, Stack, Flex } from "@chakra-ui/react";

function App() {
	return (
		<HStack flexDirection="column" alignItems="center" justifyContent="center" zIndex="1" color="var(--text-color)">
			<Flex direction="column" w="50%">
		<Stack alignItems="center" zIndex="1" my="5rem" overflow="hidden">
				<MainHeader />
				<AcheivementsContainer />
				<ColorModeButton />
				{/* <ColorModeButton /> */}
				{/* <ThemeToggleButton /> */}
			</Flex>
		</Stack>
	);
}

export default App;
