import { useState } from "react";
import { chakra } from "@chakra-ui/react";
// import ResumeCvSquareSvg from "@/assets/icons/experience/resume-cv-square.svg?react";
import ResumeCvBoxSvg from "@/assets/icons/experience/resume-cv-box.svg?react";
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
				h="inherit"
				w="auto"
				// border="1px solid green"
				_hover={{ color: "blackAlpha.950", cursor: "pointer" }}
				onClick={() => setDialogOpen(true)}
			>
				<ResumeCvBoxSvg
					fill="currentColor"
					style={{
						width: "auto",
						height: "18px",
					}}
				/>
			</chakra.button>

			<ResumeDialogContainer isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
		</>
	);
}

export default ResumeIcon;
