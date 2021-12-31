import { NextPage } from "next";
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
			<h1>Login</h1>
			<LoginForm {...props} />
		</>
	);
};

export default Login;
