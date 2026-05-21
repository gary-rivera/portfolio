import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import ResumeCvSquareSvg from "@/assets/icons/experience/resume-cv-square.svg?react";
import ResumeDialogContainer from "./ResumeDialogContainer";

function ResumeIcon() {
	const [isDialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<chakra.button
				color="textMuted"
				h="14px"
				w="14px"
				transition="color 200ms var(--ease-out)"
				_hover={{ color: "textPrimary", cursor: "pointer" }}
				onClick={() => setDialogOpen(true)}
				aria-label="Open resume"
			>
				<ResumeCvSquareSvg
					fill="none"
					stroke="currentColor"
					style={{
						width: "100%",
						height: "100%",
					}}
				/>
			</chakra.button>

			<ResumeDialogContainer isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
		</>
	);
}

export default ResumeIcon;
