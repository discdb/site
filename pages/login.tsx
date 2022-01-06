import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getProviders, getSession, useSession } from "next-auth/react";

import { LoginForm } from "../components/user/login/LoginForm";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
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

const errors = {
	oauth: "Account is logged in with Discord!",
	invalid: "Invalid credentials provided.",
};

const Login: NextPage<Props> = (props) => {
	const { error } = useRouter().query;
	const errorMessage: string = error && errors[error.toString()];
	return (
		<>
			<Head>
				<title>Login</title>
				<meta content="Login" property="og:title" />
			</Head>
			{errorMessage}
			<LoginForm {...props} />
		</>
	);
};

export default Login;
