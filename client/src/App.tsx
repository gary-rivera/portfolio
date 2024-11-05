import RuioWrapper from 'ruio';
import MainHeader from './components/header/MainHeader';
import ContentContainer from './components/content/ContentContainer';
import ThemeToggleButton from './components/ThemeToggleButton';
import { Provider /*as ChakraProvider*/ } from '@/components/ui/provider';
import { HStack, Flex } from '@chakra-ui/react';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

function App() {
	return (
		<>
			<RuioWrapper>
				<Provider>
					<ThemeProvider>
						<HStack className="app-container">
							<Flex className="content" direction="column">
								<MainHeader />
								{/* TODO: style the toggle, reference spline for inspo */}
								<ContentContainer />
								{/* <ThemeToggleButton /> */}
							</Flex>
						</HStack>
					</ThemeProvider>
				</Provider>
			</RuioWrapper>
		</>
	);
}

export default App;
