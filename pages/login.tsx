import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getProviders, getSession } from "next-auth/react";
import { useState } from "react";

import ErrorBar from "../components/ui/error/ErrorBar";
import { LoginForm } from "../components/user/login/LoginForm";

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
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
	CredentialsSignin: "Invalid credentials provided.",
	OAuthAccountNotLinked:
		"To confirm your identity, sign in with the same account you used originally.",
	default: "Unable to sign in.",
};

const Login: NextPage<Props> = (props) => {
	const router = useRouter();
	const { error } = router.query;
	const [errorMessage, setError] = useState(
		errors[`${error}`] || (error && errors["default"])
	);

	return (
		<>
			<Head>
				<title>Login</title>
				<meta content="Login" property="og:title" />
			</Head>
			{errorMessage && (
				<ErrorBar
					message={errorMessage}
					clearError={() => {
						setError(null);
						router.replace(router.pathname);
					}}
				/>
			)}
			<LoginForm {...props} />
		</>
	);
};

export default Login;
