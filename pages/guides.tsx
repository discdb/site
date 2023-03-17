import { Box, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Guides: NextPage = () => {
	return (
		<>
			<Head>
				<title>Guides</title>
				<meta content="Guides" property="og:title" />
			</Head>
			<Box py={{ base: '2rem', md: '4rem' }}>
				<Heading as="h2" size="2xl" mb={{ base: '2rem', md: '4rem' }}>
					Guides
				</Heading>
			</Box>
		</>
	);
};

export default Guides;
