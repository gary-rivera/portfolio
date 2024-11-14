import { chakra, Box, HStack, Button, Image } from "@chakra-ui/react";
import ResumeCvSvgIcon from "@/assets/resume-cv.svg?react";
import ResumeAsImage from "@/assets/fancy-resume.png";
import React, { useState } from "react";
import ResumeDialogContainer from "./ResumeDialogContainer";

function ResumeIcon() {
	const [isDialogOpen, setDialogOpen] = useState(false);

	return (
		<>
			<chakra.button
				color="blackAlpha.600"
				py="0.5"
				px="1"
				h="inherit"
				_hover={{ bg: "blackAlpha.200", color: "blackAlpha.950" }}
				onClick={() => setDialogOpen(true)}
			>
				<chakra.a>
					<ResumeCvSvgIcon
						fill="currentColor"
						style={{
							maxHeight: "inherit",
							width: "30px",

							height: "inherit",
						}}
					/>
				</chakra.a>
			</chakra.button>

			<ResumeDialogContainer isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
				{/* <Box h="500px" w="200px"></Box> */}
				<Image src={ResumeAsImage} />
			</ResumeDialogContainer>
		</>
	);
}

export default ResumeIcon;
