import SequelizeAdapter from "@next-auth/sequelize-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";

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
				attributes: [
					"email",
					"username",
					"name",
					"hash_password",
					"id",
				],
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
		if (account && account.provider == "credentials") {
			token.id = user.dataValues.id;
		}
		return token;
	},
	async session({ session, token }) {
		if (token?.id) {
			session.user.id = token.id;
		} else {
			const existingUser = await User.findOne({
				where: { email: session.user.email },
				attributes: ["id"],
			});
			session.user.id = existingUser.id;
		}

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
// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options);
