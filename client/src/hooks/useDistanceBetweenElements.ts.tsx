import { useEffect, useState, RefObject } from "react";

export type Distance = {
	distance: number | null;
	horizontalDistance: number | null;
	verticalDistance: number | null;
};

export function useDistanceBetweenElements(ref1: RefObject<HTMLElement>, ref2: RefObject<HTMLElement>): Distance {
	const [distance, setDistance] = useState<number | null>(null);
	const [horizontalDistance, setHorizontalDistance] = useState<number | null>(null);
	const [verticalDistance, setVerticalDistance] = useState<number | null>(null);

	const calculateDistances = () => {
		if (ref1.current && ref2.current) {
			const rect1 = ref1.current.getBoundingClientRect();
			const rect2 = ref2.current.getBoundingClientRect();

			const x1 = rect1.left + rect1.width / 2;
			const y1 = rect1.top + rect1.height / 2;
			const x2 = rect2.left + rect2.width / 2;
			const y2 = rect2.top + rect2.height / 2;

			const calculatedDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
			setDistance(calculatedDistance);
			setHorizontalDistance(Math.abs(x2 - x1));
			setVerticalDistance(Math.abs(y2 - y1));
		}
	};

	useEffect(() => {
		let animationFrameId: number;

		const calculateWithDelay = () => {
			setTimeout(() => {
				animationFrameId = requestAnimationFrame(calculateDistances);
			}, 15);
		};

		calculateWithDelay();

		const handleResize = () => {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = requestAnimationFrame(calculateDistances);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, [ref1, ref2]);

	return {
		distance,
		horizontalDistance,
		verticalDistance,
	};
}
