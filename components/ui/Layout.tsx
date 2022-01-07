import Head from "next/head";

import { Header } from "./nav/NavBar";
import { Footer } from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>dvdb</title>
				<meta content="website" property="og:type" />
				<meta content="dvdb.video" property="og:site_name" />
			</Head>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
