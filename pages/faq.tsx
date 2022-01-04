import { NextPage } from "next";
import Head from "next/head";

const FAQ: NextPage = () => {
	return (
		<>
			<Head>
				<title>Frequently Asked Questions</title>
				<meta
					content="Frequently Asked Questions"
					property="og:title"
				/>
			</Head>
			<div className="info-page">
				<h1>Frequently Asked Questions</h1>
			</div>
		</>
	);
};
export default FAQ;
