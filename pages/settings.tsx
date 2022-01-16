import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";

import { Dashboard } from "../components/ui/settings/Dashboard";

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);

	if (!session)
		return { redirect: { destination: "/login", permanent: false } };

	return {
		props: {},
	};
};
const Settings: NextPage = () => {
	return (
		<>
			<h2>Settings</h2>
			<Dashboard />
		</>
	);
};
export default Settings;
