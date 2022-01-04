import { NextPage } from "next";
import { getSession } from "next-auth/react";

import { RegisterForm } from "../components/user/register/RegisterForm";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	if (session) return { redirect: { destination: "/", permanent: false } };

	return {
		props: {},
	};
};
const Register: NextPage = () => {
	return <RegisterForm />;
};
export default Register;
