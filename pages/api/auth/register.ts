import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

import { apiHandler } from "../../../helpers/api";
import connectDB from "../../../helpers/sequelize";
import User from "../../../models/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		body: { email, password, name, username },
	} = req;
	await connectDB();

	const existingUser = await User.findOne({
		where: {
			[Op.or]: [{ email }, { username }],
		},
	});

	if (!existingUser) {
		const newUser = await User.create({
			name,
			username,
			email,
			hash_password: bcrypt.hashSync(password, 10),
		});

		newUser &&
			res.status(200).send({
				user: {
					name,
					username,
					email,
				},
			});
	} else {
		res.status(409).send({
			message: "Account with this email or username already exists!",
		});
	}

	Promise.resolve({});
}

export default apiHandler({ post: handler });
