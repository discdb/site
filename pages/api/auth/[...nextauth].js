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
			const existingUser = await User.findOne({
				where: { email },
				attributes: ["email", "username", "name", "hash_password"],
			});

			if (existingUser) {
				if (!("hash_password" in existingUser)) {
					throw new Error("oauth");
				} else if (
					"hash_password" in existingUser &&
					existingUser.comparePassword(password)
				) {
					return existingUser;
				}
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
const callbacks = {
	async jwt({ token, user, account }) {
		if (account && account.provider != "discord") {
			console.log(account);
			token.username = user.dataValues.username;
		}
		return token;
	},
	async session({ session, token }) {
		if (token?.username) session.user.username = token.username;
		return session;
	},
};
const options = {
	adapter: SequelizeAdapter(sequelize, {
		models: {
			User,
		},
	}),
	callbacks,
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
