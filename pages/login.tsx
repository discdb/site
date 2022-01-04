import { NextPage } from "next";
import Head from "next/head";
import { getProviders, getSession } from "next-auth/react";

import { LoginForm } from "../components/user/login/LoginForm";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	if (session) return { redirect: { destination: "/", permanent: false } };
	const { referer } = context.req.headers;

	return {
		props: {
			providers: await getProviders(),
			referer: referer || "",
		},
	};
};

interface Props {
	providers: JSON;
	referer: string;
}

const Login: NextPage<Props> = (props) => {
	return (
		<>
			<Head>
				<title>Login</title>
				<meta content="Login" property="og:title" />
			</Head>
			<LoginForm {...props} />
		</>
	);
};

export default Login;
