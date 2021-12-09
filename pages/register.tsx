import { RegisterForm } from "../components/user/register/RegisterForm";
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
const Register = ({ session }) => {
	if (session && process.browser) Router.push("/");

	return session ? (
		<div />
	) : (
		<div>
			<RegisterForm />
		</div>
	);
};
export default Register;
