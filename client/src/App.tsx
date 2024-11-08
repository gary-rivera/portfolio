import RuioWrapper from 'ruio';
import MainHeader from './components/header/MainHeader';
import AcheivementsContainer from './components/content/AcheivementsContainer';
import ThemeToggleButton from './components/ThemeToggleButton';
import { Provider as ChakraProvider } from '@/components/ui/provider';
import { HStack, Flex } from '@chakra-ui/react';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
	return (
		<RuioWrapper>
			<ChakraProvider>
				<ThemeProvider>
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
							<ThemeToggleButton />
						</Flex>
					</HStack>
				</ThemeProvider>
			</ChakraProvider>
		</RuioWrapper>
	);
}

export default App;
