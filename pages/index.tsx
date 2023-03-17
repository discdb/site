import { Box, Button, Heading, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import ChakraNextLink from '../components/ChakraNextLink';

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home</title>
				<meta content="Home" property="og:title" />
			</Head>
			<Box maxW={['100%', '80%', '65%']} py={{ base: '7rem', lg: '14rem' }}>
				<Heading mb={4} as="h2" size="3xl">
					Preserved for the future.
				</Heading>
				<Text fontSize="xl">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam
				</Text>
				<Box textAlign="right">
					<ChakraNextLink href={'/media'}>
						<Button
							size="md"
							color="black"
							mt="24px"
							p=".6rem 2rem"
							border="2px"
							bg="white"
							borderRadius="1rem"
							borderColor="gray.200"
						>
							Explore the database
						</Button>
					</ChakraNextLink>
				</Box>
			</Box>
		</>
	);
};

export default Home;
