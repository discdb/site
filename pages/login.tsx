import { LoginForm } from "../components/user/login/LoginForm";
import { providers, getSession } from "next-auth/client";
import Router from "next/router";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);
	return {
		props: {
			providers: await providers(),
			session,
		},
	};
};

const Login = ({ providers, session }) => {
	const currentUser = session?.user;

	if (currentUser && process.browser) Router.push("/");

	return currentUser ? (
		<div />
	) : (
		<div>
			<LoginForm {...providers} />
		</div>
	);
};
export default Login;
