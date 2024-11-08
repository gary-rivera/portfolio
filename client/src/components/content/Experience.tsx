import { useResumeRepo } from '../../hooks/useGitHub';
import {
	Heading,
	Text,
	Link,
	Code,
	Box,
	List,
	ListItem,
	Image,
} from '@chakra-ui/react';
import Markdown from 'react-markdown';

function Experience() {
	const { readmeContent, isLoading, isError } = useResumeRepo();

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>Error loading repository contentsaaa</p>;

	return (
		<Box>
			<Markdown
				components={{
					h1: ({ children }) => (
						<Heading as="h1" size="2xl" mt={4}>
							{children}
						</Heading>
					),
					h2: ({ children }) => (
						<Heading as="h2" size="xl" my={2}>
							{children}
						</Heading>
					),
					h3: ({ children }) => (
						<Heading as="h3" size="lg" my={4}>
							{children}
						</Heading>
					),
					p: ({ children }) => <Text my={2}>{children}</Text>,
					a: ({ href, children }) => (
						<Link color="teal.500" href={href}>
							{children}
						</Link>
					),
					code: ({ children }) => (
						<Code p={1} fontSize="sm">
							{children}
						</Code>
					),
					ul: ({ children }) => (
						<List.Root pl={4} my={2}>
							{children}
						</List.Root>
					),
					ol: ({ children }) => (
						<List.Item as="ol" pl={4} my={2}>
							{children}
						</List.Item>
					),
					li: ({ children }) => <ListItem>{children}</ListItem>,
					img: ({ src, alt }) => <Image src={src} alt={alt} my={4} />,
				}}
			>
				{readmeContent}
			</Markdown>
		</Box>
	);
}

export default Experience;
