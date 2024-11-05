import { defineAnimationStyles } from '@chakra-ui/react';

const animationStyles = defineAnimationStyles({
	slideFadeIn: {
		value: {
			animationName: 'slide-in, fade-in',
			animationDuration: '0.5s',
			animationTimingFunction: 'ease-in-out',
		},
	},
	slideFadeOut: {
		value: {
			animationName: 'slide-out, fade-out',
			animationDuration: '0.5s',
			animationTimingFunction: 'ease-in-out',
		},
	},
}) as Record<string, unknown>;  // Using a basic type assertion

export default animationStyles;