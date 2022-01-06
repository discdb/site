import bcrypt from "bcrypt";
import { Op } from "sequelize";

import { apiHandler } from "../../../helpers/api";
import connectDB from "../../../helpers/sequelize";
import User from "../../../models/User";

async function handler(req: any, res: any) {
	return new Promise(async (resolve) => {
		const {
			body: { email, password, fullName, username },
		} = req;
		await connectDB();

		const existingUser = await User.findOne({
			where: {
				[Op.or]: [{ email }, { username }],
			},
		});

		if (!existingUser) {
			const newUser = await User.create({
				fullName,
				username,
				email,
				hash_password: bcrypt.hashSync(password, 10),
			});

			newUser &&
				res.status(200).send({
					user: {
						fullName,
						username,
						email,
					},
				});
		} else {
			res.status(409).send({
				message: "Account with this email or username already exists!",
			});
		}

		resolve({});
	});
}

export default apiHandler({ post: handler });
