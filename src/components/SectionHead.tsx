import { Box, chakra, Flex } from "@chakra-ui/react";

type Props = {
	name: string;
	meta?: string;
};

function SectionHead({ name, meta }: Props) {
	return (
		<Flex align="center" gap="0.75rem" color="textSubtle" fontSize="12px" mb="0.9rem">
			<chakra.span color="phosphor">~</chakra.span>
			<chakra.span color="text">{name}</chakra.span>
			<Box flex="1" borderTop="1px dashed" borderColor="rule" h="1px" />
			{meta && <chakra.span fontSize="11px">{meta}</chakra.span>}
		</Flex>
	);
}

export default SectionHead;
