import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";

import { RegisterForm } from "../components/user/register/RegisterForm";

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);

	if (session) return { redirect: { destination: "/", permanent: false } };

	return {
		props: {},
	};
};
const Register: NextPage = () => {
	return (
		<>
			<Head>
				<title>Register</title>
				<meta content="Register" property="og:title" />
			</Head>
			<RegisterForm />
		</>
	);
};
export default Register;
