import { useState, useEffect } from "react";
import MainHeader from "./components/header/MainHeader";
import AcheivementsContainer from "./components/AcheivementsContainer";
import ContactMeIconTray from "./components/ContactMeIconTray";
import { HStack, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

// p1 aka mandatory for today
// DONE: responsive design -> media querying
// DONE: make resume in code

// p2 aka mandatory for release
// DONE: update repo descriptions and add topics too
// DONE: hook up links for projects + conditional render of icons controller
// WIP: find/make better icons for projects (outsource?)
// DONE: finalize the onload animations. loadtimes are a bit slow rn

// p3 aka low hanging fruit
// TODO: add some flare/love to the ProjectCard's. Feels lacking in comparison
// TODO: remove all `type: any`
// DONE: add iconRef for height differential on TimelinePath offset (static to 20px rn)
// TODO: assets/icons cleanup or optimize?
// DONE: HAVE TO -_- redo navtab UI for selecting tab. underline on current tab and opaque background too UNTIL other tab is hovered, then animate that opaque background to the hovered tab.
// TODO: memoize the tabs content so that it doesn't rerender on tab switch

// maybe/graveyard

// TODO: gradient on top or bottom (or both?) of the achievement container so that content isnt so suddenly cut off
// TODO: maybe? dynamic pull data from resume-md repo?
// TODO: maybe? fetch my user info too for overall profile stats (commits, activity charting, etc.)
// NOTE: NOT DOING - sorta undid the overlap UI that I really liked for ExperienceCards. explore how to readd that but without doing so in a hacky way

/* NOTE: NOT DOING light/dark mode:
			[ ] complete chakra migration for light/dark mode
			[ ] switch component to toggle between
	*/

function App() {
	const [isLoadingAnimationComplete, setIsLoadingAnimationComplete] = useState(false);
	const [loadRest, setLoadRest] = useState(false);

	useEffect(() => {
		if (isLoadingAnimationComplete) {
			setLoadRest(true);
		}
	}, [isLoadingAnimationComplete]);

	const containerVariants = {
		hidden: { opacity: 0, y: 0 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	const staggerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.5,
			},
		},
	};

	return (
		<HStack
			alignItems="center"
			zIndex="1"
			my={["2rem", "3rem", "4rem", "5rem"]}
			justifyContent="center"
			w="100vw"
			px={["1rem", "1.5rem", "2rem", "3rem"]}
		>
			<Flex direction="column" w="100%" maxW="1000px" h="100%" justifyContent="center" zIndex="1">
				<MainHeader setIsLoadingAnimationComplete={setIsLoadingAnimationComplete} />
				<motion.div
					variants={staggerVariants}
					initial="hidden"
					animate={loadRest ? "visible" : "hidden"}
					style={{
						width: "100%",
						height: "100%",
						marginTop: "0.5rem",
					}}
				>
					<motion.div variants={containerVariants}>
						<AcheivementsContainer />
					</motion.div>
					<motion.div variants={containerVariants}>
						<ContactMeIconTray />
					</motion.div>
				</motion.div>
			</Flex>
		</HStack>
	);
}

export default App;
