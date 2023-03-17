import { Box } from '@chakra-ui/react';
import Head from 'next/head';

import { Footer } from './Footer';
import WithSubnavigation from './NavBar';

const Layout = ({ children }: any) => {
	return (
		<>
			<Head>
				<title>dvdb</title>
				<meta content="website" property="og:type" />
				<meta content="dvdb.video" property="og:site_name" />
			</Head>
			<WithSubnavigation />
			<main>
				<Box
					px={{ base: '1.25rem', tablet: '4rem', md: '8rem' }}
					bg="gray.100"
					color="black"
					minH="75vh"
				>
					{children}
				</Box>
			</main>
			<Footer />
		</>
	);
};

export default Layout;
