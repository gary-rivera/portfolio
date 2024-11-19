import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import ResumeCvBoxSvg from "@/assets/icons/experience/resume-cv-box.svg?react";

import ResumeDialogContainer from "./ResumeDialogContainer";

function ResumeIcon() {
	const [isDialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<chakra.button
				color="blackAlpha.600"
				py="0.5"
				m="0"
				p="0"
				h="24px"
				w="auto"
				_hover={{ color: "blackAlpha.950", cursor: "pointer" }}
				onClick={() => setDialogOpen(true)}
			>
				<ResumeCvBoxSvg
					fill="currentColor"
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
