import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

import SequelizeAdapter from "@next-auth/sequelize-adapter";

import { sequelize } from "../../../helpers/sequelize";
import User from "../../../models/User";

const providers = [
	Credentials({
		name: "Login",
		credentials: {
			email: { label: "Email", type: "text" },
			password: { label: "Password", type: "password" },
		},
		async authorize({ email, password }) {
			const existingUser = await User.findOne({ where: { email } });

			if (!existingUser?.hash_password) {
				throw new Error("oauth");
			} else if (
				existingUser?.hash_password &&
				existingUser.comparePassword(password)
			) {
				return existingUser;
			}

			return null;
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
			User,
		},
	}),
	pages: {
		signIn: "/login",
		error: "/login",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: process.env.AUTH_SECRET,
	providers,
};
export default (req, res) => NextAuth(req, res, options);
