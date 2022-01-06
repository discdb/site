import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

import SequelizeAdapter, { models } from "@next-auth/sequelize-adapter";
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

import { sequelize } from "../../../helpers/sequelize";

const providers = [
	Credentials({
		name: "Login",
		credentials: {
			email: { label: "Email", type: "text" },
			password: { label: "Password", type: "password" },
		},
		async authorize({ email, password }) {
			return new Promise(async (resolve, reject) => {
				const User = sequelize.models.user;
				const existingUser = await User.findOne({ where: { email } });

				if (!existingUser["hash_password"]) {
					reject(new Error("oauth"));
				} else if (
					existingUser["hash_password"] &&
					bcrypt.compareSync(existingUser["hash_password"], password)
				) {
					resolve({ user: existingUser });
				}
				reject(new Error("invalid"));
			});
		},
	}),
	Discord({
		clientId: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET,
		authorization:
			"https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
	}),
];

const options = {
	adapter: SequelizeAdapter(sequelize, {
		models: {
			User: sequelize.define("user", {
				...models.User,
				hash_password: DataTypes.STRING,
				roles: DataTypes.ARRAY(DataTypes.STRING),
				collection: DataTypes.ARRAY(DataTypes.UUID),
				posts: DataTypes.ARRAY(DataTypes.UUID),
				reviews: DataTypes.ARRAY(DataTypes.UUID),
				comments: DataTypes.ARRAY(DataTypes.UUID),
			}),
		},
	}),
	pages: {
		signIn: "/login",
		error: "/login",
	},
	// session: {
	// 	strategy: "jwt",
	// 	maxAge: 30 * 24 * 60 * 60, // 30 days
	// },
	secret: process.env.AUTH_SECRET,
	providers,
};
export default (req: any, res: any) => NextAuth(req, res, options);
