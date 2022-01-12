import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../../helpers/api";
import connectDB from "../../../helpers/sequelize";
import Media from "../../../models/Media";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise(async (resolve) => {
		await connectDB();
		Media.create();
		resolve({});
	});
}

export default apiHandler({ post: handler });
