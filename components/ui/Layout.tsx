import Head from "next/head";

import { Footer } from "./Footer";
import { Header } from "./nav/NavBar";

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
