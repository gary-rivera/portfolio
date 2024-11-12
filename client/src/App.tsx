import MainHeader from "./components/header/MainHeader";
import AcheivementsContainer from "./components/AcheivementsContainer";
// import ThemeToggleButton from './components/ThemeToggleButton';
import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack, Stack, Flex } from "@chakra-ui/react";

function App() {
	// p1
	// DONE: deprecate timeline component?
	// DONE: conditional render only active projects
	// DONE: hookup gql to localize repos data fetching as much as possible
	// DONE: move data fetching to context
	// DONE: start API call while page is loading and when experience tab is rendered
	// DONE: ensure API calls are preserved (state vs. context) and don't refetch on tab toggle -- memoize components
	// DONE: repo.languages_url map during data mapping in context
	// DONE: fix only seeing all content after toggling back and forth
	// DONE: prefetch background images within html head
	// TODO: maybe? fetch my user info too for overall profile stats (commits, activity charting, etc.)
	// TODO: update repo descriptions
	// TODO: instead of starting from 0 height back to whatever it should be, just shorten/heighten to where it should go.
	// TODO: add topics to repo's too
	// DONE: custom timeline component since chakra is ass now
	// TODO: finish experience section via resume-md repo.static to have static object values for experience
	// DONE: Experience tab acceptable-ish state

	// p2
	/*
	TODO: Project Card fine tuning -- spacing/margin/padding:
			[ ] badge mapping to color scheme for languages and stack
			[ ] format icon sizing by using array for [icon, relativeDimensionSizing]
			[ ] bottom HStack as footer (at end of container)
			[ ] hover + click effect of project title
	*/
	// TODO: on page load effect: blur -> focus in of header only (handle api calls in context while this happens)
	// TODO: resume modal popup (use the figma visually appealing version)
	// DONE: (after context api data management complete) cleanup api.ts and useGithub.ts files
	// TODO: add iconRef for height differential on TimelinePath offset (static to 20px rn)
	// TODO: sorta undid the overlap UI that I really liked for ExperienceCards. explore how to readd that but without doing so in a hacky way

	// p3
	// DONE: scrub though and complete all relevant TODO's leftover
	// TODO: skeleton component while/if project/experience values have to load
	// TODO: responsive design -> media querying
	// DONE: cleanup unused imports
	// DONE: cleanup leftover docu
	// TODO: optimize/improve Performance (g devtools)
	// DONE: remove uneeded box wrapper for Experience and Projects component. hat on hat
	/* NOTE: NOT DOING light/dark mode:
			[ ] complete chakra migration for light/dark mode
			[ ] switch component to toggle between
	*/
	// TODO: remove all `type: any`

	// p4 / maybe nah

	return (
		<HStack alignItems="center" zIndex="1" my="5rem" overflow="hidden" justifyContent="center">
			<Flex direction="column" w="60%">
				<MainHeader />
				<AcheivementsContainer />
				<ColorModeButton w="2rem" />
				{/* TODO: rest of social icons */}
			</Flex>
		</HStack>
	);
}

export default App;
