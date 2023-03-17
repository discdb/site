import { Box, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const AboutUs: NextPage = () => {
	return (
		<>
			<Head>
				<title>About Us</title>
				<meta content="About Us" property="og:title" />
			</Head>
			<Box py={{ base: '2rem', md: '4rem' }}>
				<Heading as="h2" size="2xl" mb={{ base: '2rem', md: '4rem' }}>
					About Us
				</Heading>
			</Box>
		</>
	);
};

export default AboutUs;
