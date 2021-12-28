import { NextPage } from "next";

const NotFound: NextPage = () => {
	return (
		<div className="info-page" style={{ color: "red" }}>
			<h1>404 : Not Found!</h1>
		</div>
	);
};
export default NotFound;
