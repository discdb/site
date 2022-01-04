import { NextPage } from "next";
import Head from "next/head";

const PrivacyPolicy: NextPage = () => {
	return (
		<>
			<Head>
				<title>Privacy Policy</title>
				<meta content="Privacy Policy" property="og:title" />
			</Head>
			<div className="info-page">
				<h1>Privacy Policy</h1>
			</div>
		</>
	);
};
export default PrivacyPolicy;
