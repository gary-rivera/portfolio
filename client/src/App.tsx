import RuioWrapper from 'ruio';
import MainHeader from './components/header/MainHeader';
import AcheivementsContainer from './components/content/AcheivementsContainer';
import ThemeToggleButton from './components/ThemeToggleButton';
import { Provider /*as ChakraProvider*/ } from '@/components/ui/provider';
import { HStack, Flex, Box } from '@chakra-ui/react';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
	return (
		<RuioWrapper>
			<Provider>
				<ThemeProvider>
					<HStack
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						zIndex="1"
						color="var(--text-color)"
						margin={{
							base: '2rem 1rem',
							md: '4rem 4rem',
							lg: '4rem 10rem',
							xl: '8rem 15rem',
						}}
					>
						<Flex direction="column" w="100%">
							<MainHeader />
							<AcheivementsContainer />
							<ThemeToggleButton />
						</Flex>
					</HStack>
				</ThemeProvider>
			</Provider>
		</RuioWrapper>
	);
}

export default App;
