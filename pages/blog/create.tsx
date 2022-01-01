import { NextPage } from "next";
import { getSession } from "next-auth/react";

import { CreatePage } from "../../components/blog/CreatePage";

export const getServerSideProps = async (context: any) => {
	const session = await getSession(context);

	if (!session)
		return { redirect: { destination: "/login", permanent: false } };

	return {
		props: {},
	};
};

const Create: NextPage = () => {
	return (
		<>
			<h2>Create Post</h2>
			<CreatePage />
		</>
	);
};
export default Create;
