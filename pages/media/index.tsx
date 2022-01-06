import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Media: NextPage = () => {
	const session = useSession();
	console.log(session);
	return (
		<>
			<h1>Media</h1>
		</>
	);
};
export default Media;
