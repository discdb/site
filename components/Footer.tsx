import { ButtonGroup, Container, IconButton, Stack, Text } from '@chakra-ui/react';
import { FaDiscord, FaGithub } from 'react-icons/fa';
// import { Logo } from './Logo';

export const Footer = () => (
	<Container
		as="footer"
		role="contentinfo"
		py={{ base: '12', md: '16' }}
		maxW="none"
		bg={'dvdbpurple.900'}
		color="white"
		px={{ base: '2rem', tablet: '4rem', md: '8rem' }}
		position="relative"
	>
		<Stack spacing={{ base: '4', md: '5' }}>
			<Stack justify="space-between" direction="row" align="center">
				{/* <Logo /> */}
				DVDB
				<ButtonGroup variant="ghost">
					<IconButton
						as="a"
						href="https://github.com/discdb/site"
						aria-label="GitHub"
						_hover={{ background: 'dvdbpurple.700' }}
						icon={<FaGithub fontSize="1.25rem" />}
					/>
					<IconButton
						as="a"
						href="https://dvdb.video/discord"
						aria-label="Discord"
						_hover={{ background: 'dvdbpurple.700' }}
						icon={<FaDiscord fontSize="1.25rem" />}
					/>
				</ButtonGroup>
			</Stack>
			<Text fontSize="sm" color="subtle">
				&copy; {new Date().getFullYear()} dvdb, All rights reserved.
			</Text>
		</Stack>
	</Container>
);
