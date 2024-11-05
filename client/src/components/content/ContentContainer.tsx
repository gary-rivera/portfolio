import { useState } from 'react';
import {
	Box,
	Flex,
	VStack,
	HStack,
	Grid,
	GridItem,
	useBoolean,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from '@chakra-ui/react';

function ContentContainer() {
	// DONE: timeline to the left
	// TODO: Tab toggle + Container
	// TODO: experience tab
	// TODO: projects tab
	// TODO: dynamic sizing - https://v2.chakra-ui.com/docs/components/transitions/usage#changing-the-startingheight OR https://v2.chakra-ui.com/docs/components/transitions/usage#changing-transitions-manually-using-motion-props
	const [flag, setFlag] = useBoolean();

	return (
		<Grid
			templateAreas={`"tabnav tabnav"
			"timeline main"
			`}
			gridTemplateRows={'35px 3fr'}
			gridTemplateColumns="repeat(4, 1fr)"
			gap={1}
		>
			<GridItem rowSpan={1} colSpan={1} colStart={2} bg="pink.300">
				<Box>tabnav</Box>
			</GridItem>
			<GridItem rowSpan={2} colSpan={1} colStart={1} bg="tomato">
				<Box>timeline</Box>
			</GridItem>
			<GridItem rowSpan={2} colSpan={3} bg="green.300">
				{activeTab === 'experience' ? (
					<Box>Experience</Box>
				) : (
					<Box>Projects</Box>
				)}
			</GridItem>
		</Grid>
	);
}

export default ContentContainer;
