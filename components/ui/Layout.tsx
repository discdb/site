import { Header } from "./nav/NavBar";
import { Footer } from "./Footer";
import Head from "next/head";

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
