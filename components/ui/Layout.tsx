import Head from "next/head";

import { Header } from "./nav/NavBar";
import { Footer } from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>dvdb</title>
			</Head>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
