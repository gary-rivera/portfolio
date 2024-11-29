import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import ResumeCvSquareSvg from "@/assets/icons/experience/resume-cv-square.svg?react";
import ResumeDialogContainer from "./ResumeDialogContainer";

function ResumeIcon() {
	const [isDialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<chakra.button
				color="blackAlpha.500"
				py="0.5"
				m="0"
				p="0"
				h="18px"
				w="auto"
				_hover={{ color: "blackAlpha.950", cursor: "pointer" }}
				onClick={() => setDialogOpen(true)}
			>
				<ResumeCvSquareSvg
					fill="none"
					stroke="currentColor"
					style={{
						width: "inherit",
						height: "inherit",
					}}
				/>
			</chakra.button>

			<ResumeDialogContainer isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
		</>
	);
}

export default ResumeIcon;
