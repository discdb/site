import { NextPage } from "next";
import Head from "next/head";

export const getServerSideProps = async () => {
	return {
		redirect: {
			destination: "https://discord.gg/HkvcwnHStn",
			permanent: false,
		},
	};
};

const Discord: NextPage = () => {
	return (
		<>
			<Head>
				<meta property="og:image" content="/mh-icon.jpg" />
				<meta
					content="A discord for physical media collectors!"
					name="og:description"
				/>
				<meta
					content="You're invited to Media Hoarders!"
					property="og:title"
				/>
			</Head>
		</>
	);
};

export default Discord;
