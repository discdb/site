import { RegisterForm } from "../components/user/register/RegisterForm";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	if (session) return { redirect: { destination: "/", permanent: false } };

	return {
		props: {},
	};
};
const Register = () => {
	return <RegisterForm />;
};
export default Register;
