import { getSession } from "next-auth/react";
import Router from "next/router";

import { CreatePage } from "../../components/blog/CreatePage";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);
	return {
		props: {
			session,
		},
	};
};

const Create = ({ session }) => {
	if (!session && process.browser) Router.push("/");

	return (
		<div>
			<CreatePage />
		</div>
	);
};
export default Create;
