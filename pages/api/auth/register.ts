import bcrypt from "bcrypt";
import { apiHandler } from "../../../helpers/api";
import { sequelize } from "../../../helpers/sequelize";

async function handler(req: any, res: any) {
	return new Promise(async (resolve) => {
		const User = sequelize.models.user;
		const {
			body: { email, password, fullName, username, security_questions },
		} = req;
		const existingUser = await User.findOne({ where: { email } });

		if (!existingUser) {
			const newUser = await User.create({
				fullName,
				username,
				email,
				hash_password: bcrypt.hashSync(password, 10),
				security_questions,
			});

			newUser &&
				res.send({
					user: {
						fullName,
						username,
						email,
					},
				});
		} else {
			res.send({
				message: "Account with this email already exists!",
			});
		}

		resolve({});
	});
}

export default apiHandler({ post: handler });
