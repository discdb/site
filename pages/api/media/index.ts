import { apiHandler } from "../../../helpers/api";
import connectDB from "../../../helpers/sequelize";
import Media from "../../../models/Media";

async function handler() {
	return new Promise((resolve) => {
		connectDB();
		Media.create();
		resolve({});
	});
}

export default apiHandler({ post: handler });
