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
				// border="1px solid red"
				_hover={{ color: "blackAlpha.950", cursor: "pointer" }}
				onClick={() => setDialogOpen(true)}
			>
				{/* <SquareCVIcon
					stroke="currentColor"
					style={{
						maxHeight: "inherit",
						width: "auto",
						height: "24px",
					}}
				/> */}
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
