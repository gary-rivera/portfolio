import { useRef, useLayoutEffect, useState } from 'react';

export function useDistanceBetweenElements() {
	const element1Ref = useRef<HTMLDivElement>(null);
	const element2Ref = useRef<HTMLDivElement>(null);
	const [distance, setDistance] = useState<number | null>(null);
	const [horizontalDistance, setHorizontalDistance] = useState<number | null>(
		null
	);
	const [verticalDistance, setVerticalDistance] = useState<number | null>(null);

	const calculateDistances = () => {
		if (element1Ref.current && element2Ref.current) {
			const rect1 = element1Ref.current.getBoundingClientRect();
			const rect2 = element2Ref.current.getBoundingClientRect();

			const x1 = rect1.left + rect1.width / 2;
			const y1 = rect1.top + rect1.height / 2;
			const x2 = rect2.left + rect2.width / 2;
			const y2 = rect2.top + rect2.height / 2;

			const calculatedDistance = Math.sqrt(
				Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
			);
			setDistance(calculatedDistance);
			setHorizontalDistance(Math.abs(x2 - x1));
			setVerticalDistance(Math.abs(y2 - y1));
		}
	};

	useLayoutEffect(() => {
		let animationFrameId: number;

		const calculateWithDelay = () => {
			animationFrameId = requestAnimationFrame(() => calculateDistances());
		};

		// Initial calculation with delay to allow any async DOM changes to complete
		calculateWithDelay();

		// Recalculate on window resize
		const handleResize = () => calculateWithDelay();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []); // Only runs on initial mount

	return {
		distance,
		horizontalDistance,
		verticalDistance,
		element1Ref,
		element2Ref,
	};
}
