import { NextPage } from "next";
import Head from "next/head";
import { getProviders, getSession } from "next-auth/react";

import { LoginForm } from "../components/user/login/LoginForm";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	if (session) return { redirect: { destination: "/", permanent: false } };
	const { referer } = context.req.headers;

	return {
		props: {
			// providers: await getProviders() || [],
			referer: referer || "",
		},
	};
};

interface Props {
	referer: string;
}

const Login: NextPage<Props> = (props) => {
	const [providers, setProviders] = useState(null);

	useEffect(() => {
	  (async () => {
		const res = await getProviders();
		setProviders(res);
		console.log(res)
	  })();
	}, []);

	return (
		<>
			<Head>
				<title>Login</title>
				<meta content="Login" property="og:title" />
			</Head>
			<LoginForm referer={props.referer} providers={providers}/>
		</>
	);
};

export default Login;
