import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [
	// Providers.Credentials({
	// 	name: "Credentials",
	// 	credentials: {
	// 		email: { label: "Email", type: "text" },
	// 		password: { label: "Password", type: "password" },
	// 	},
	// }),
	Providers.Discord({
		clientId: process.env.DISCORD_CLIENT_ID,
		clientSecret: process.env.DISCORD_CLIENT_SECRET,
		authorization:
			"https://discord.com/api/oauth2/authorize?scope=identify+email+guilds",
	}),
];

const callbacks = {
	// Getting the JWT token from API response
	async jwt(token, user) {
		if (user) {
			token = user;
		}
		return token;
	},

	async session(session, token) {
		session = token;

		return session;
	},
};
const options = {
	pages: {
		signIn: "/login",
	},
	callbacks,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: process.env.AUTH_SECRET,
	providers,
};

export default (req, res) => NextAuth(req, res, options);
