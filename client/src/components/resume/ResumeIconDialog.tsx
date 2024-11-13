import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { chakra, HStack, Button, Image } from "@chakra-ui/react";
import ResumeCvSvgIcon from "@/assets/resume-cv.svg?react";
import ResumeAsImage from "@/assets/fancy-resume.png";

function ResumeIconDialog() {
	const ImagineThisWorksAgain = chakra(DialogContent);
	return (
		<DialogRoot key={"md"} size="lg" placement="center" scrollBehavior="inside" motionPreset="slide-in-top" defaultOpen>
			<DialogTrigger asChild>
				<chakra.button
					color="blackAlpha.600"
					py="0.5"
					px="1"
					h="inherit"
					_hover={{ bg: "blackAlpha.200", color: "blackAlpha.950" }}
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
			</DialogTrigger>
			<ImagineThisWorksAgain bg="whiteAlpha.700">
				<DialogHeader></DialogHeader>
				<DialogBody>
					<Image src={ResumeAsImage} w="800px" />
				</DialogBody>
				<DialogFooter>
					{/* <DialogActionTrigger asChild> */}
					{/* <Button variant="outline">Cancel</Button> */}
					{/* </DialogActionTrigger> */}
					<Button>Download .pdf</Button>
				</DialogFooter>
				<DialogCloseTrigger />
			</ImagineThisWorksAgain>
		</DialogRoot>
	);
}

export default ResumeIconDialog;
