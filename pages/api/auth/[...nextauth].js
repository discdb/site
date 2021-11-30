import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [
	Providers.Discord({
		clientId: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET,
	}),
];

const options = {
	pages: {
		signIn: "/login",
	},
	providers,
};

export default (req, res) => NextAuth(req, res, options);
