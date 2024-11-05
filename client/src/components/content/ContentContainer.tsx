import { useEffect, useState } from "react"
import {
	Grid,
	GridItem,
	Group,
	Tabs,
	Stack
} from '@chakra-ui/react';
import { Button } from "@/components/ui/button"
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "@/components/ui/steps"

function ContentContainer() {
	// DONE: timeline to the left
	// TODO: Tab toggle + Container
	// TODO: experience tab
	// TODO: projects tab
	// TODO: dynamic sizing - https://v2.chakra-ui.com/docs/components/transitions/usage#changing-the-startingheight OR https://v2.chakra-ui.com/docs/components/transitions/usage#changing-transitions-manually-using-motion-props

	return (
		<Grid gridTemplateRows={'35px 3fr'} gridTemplateColumns="repeat(4, 1fr)">
			<GridItem rowSpan={2} colSpan={1} colStart={1} rowStart={2} bg="tomato">
				<StepsRoot orientation="vertical" height="400px" defaultValue={1} count={3}>
				<StepsList>
					<StepsItem index={0} title="2025" />
					<StepsItem index={1} title="2024" />
					<StepsItem index={2} title="2023" />
				</StepsList>

				<Stack>
					<Group>
						<StepsPrevTrigger asChild>
							<Button variant="outline" size="xs">
								Prev
							</Button>
						</StepsPrevTrigger>
						<StepsNextTrigger asChild>
							<Button variant="outline" size="sm">
								Next
							</Button>
						</StepsNextTrigger>
					</Group>
				</Stack>
			</StepsRoot>
			</GridItem>
			<GridItem rowSpan={2} colSpan={3}>
				<Tabs.Root variant="line" defaultValue="experience" /*value={value} onValueChange={(e) => setValue(e.value)}*/>
      <Tabs.List bg="none">
        <Tabs.Trigger value="experience" bg="none">Experience</Tabs.Trigger>
        <Tabs.Trigger value="projects" bg="none">Projects</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content bg="green.300"value="experience">Experience panel</Tabs.Content>
      <Tabs.Content bg="green.300" value="projects">Projects panel</Tabs.Content>
    </Tabs.Root>
			</GridItem>
		</Grid>
	);
}

export default ContentContainer;
