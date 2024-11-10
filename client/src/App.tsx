import MainHeader from './components/header/MainHeader';
import AcheivementsContainer from './components/content/AcheivementsContainer';
// import ThemeToggleButton from './components/ThemeToggleButton';
import { ColorModeButton } from '@/components/ui/color-mode';
import { HStack, Flex } from '@chakra-ui/react';
import './App.css';
import * as chakra from '@chakra-ui/react';
console.log('[theme] chakra object: ', chakra);

function App() {
	return (
		<HStack
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			zIndex="1"
			color="var(--text-color)"
		>
			<Flex direction="column" w="50%">
				<MainHeader />
				<AcheivementsContainer />
				<ColorModeButton />
				{/* <ThemeToggleButton /> */}
			</Flex>
		</HStack>
	);
}

export default App;
