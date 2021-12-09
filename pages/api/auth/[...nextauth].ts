import NextAuth from "next-auth";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";
import Discord from "next-auth/providers/discord";

const DATABASE: string = process.env.DATABASE || "";
const USER: string = process.env.USER || "";
const PASSWORD: string = process.env.PASSWORD || "";

const providers = [
	Discord({
		clientId: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET,
		authorization:
			"https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
	}),
];

const callbacks = {
	// Getting the JWT token from API response
	async jwt({ token, user }) {
		if (user) {
			token = user;
		}
		return token;
	},

	async session({ session, token }) {
		session = token;

		return session;
	},
};
const options = {
	database: `postgres://${USER}:${PASSWORD}@127.0.0.1:5432/${DATABASE}`,
	pages: {
		signIn: "/login",
	},
	// callbacks,
	// session: {
	// 	strategy: "jwt",
	// 	maxAge: 30 * 24 * 60 * 60, // 30 days
	// },
	secret: process.env.AUTH_SECRET,
	providers,
};

export default (req, res) => NextAuth(req, res, options);
