import { LoginForm } from "../components/user/login/LoginForm";
import { getProviders, getSession } from "next-auth/react";
import Router from "next/router";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	return {
		props: {
			providers: await getProviders(),
			session,
		},
	};
};

const Login = ({ providers, session }) => {
	if (session && process.browser) Router.push("/");

	return session ? (
		<div />
	) : (
		<div>
			<LoginForm {...providers} />
		</div>
	);
};
export default Login;
