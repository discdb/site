import { getProviders, getSession } from "next-auth/react";
import { LoginForm } from "../components/user/login/LoginForm";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	if (session) return { redirect: { destination: "/", permanent: false } };

	return {
		props: {
			providers: await getProviders(),
		},
	};
};

const Login = ({ providers }) => {
	return <LoginForm {...providers} />;
};
export default Login;
