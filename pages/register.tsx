import { RegisterForm } from "../components/user/register/RegisterForm";
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
const Register = ({ session }) => {
	const currentUser = session?.user;

	if (currentUser && process.browser) Router.push("/");

	return currentUser ? (
		<div />
	) : (
		<div>
			<RegisterForm />
		</div>
	);
};
export default Register;
