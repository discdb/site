import SequelizeAdapter from "@next-auth/sequelize-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import { signOut } from "next-auth/react";

import { sequelize } from "../../../helpers/sequelize";
import * as MODELS from "../../../models/";

const providers = [
    // EmailProvider({
    //     name: "Email",
    //     from: "noreply@dvdb.video",
    //     server: {
    //         port: 465,
    //         host: "smtp.gmail.com",
    //         secure: true,
    //         auth: {
    //             user: "admin@dvdb.video",
    //             pass: process.env.EMAIL_PASSWORD,
    //         },
    //         tls: {
    //             rejectUnauthorized: false,
    //         },
    //     },
    // }),
    Credentials({
        name: "Login",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize({ email, password }) {
            const existingUser = await MODELS.User.findOne({
                where: { email },
                attributes: [
                    "email",
                    "username",
                    "name",
                    "hash_password",
                    "id",
                    "roles",
                    "disabled",
                    "emailVerified",
                ],
            });

            if (existingUser) {
                if (!("hash_password" in existingUser)) {
                    throw new Error("oauth");
                } else if (!existingUser["emailVerified"]) {
                    throw new Error("email_not_confirmed");
                } else if (
                    "hash_password" in existingUser &&
                    bcrypt.compareSync(password, existingUser.hash_password)
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
        // authorization: 'https://discord.com/api/oauth2/authorize?scope=identify+email+guilds'
    }),
];
const callbacks = {
    async signIn({ user }) {
        if (user.disabled) return false;

        return true;
    },
    async jwt({ token, user, account }) {
        if (account && account.provider == "credentials") {
            token.id = user.dataValues.id;
        }

        if (account) {
            token.roles = user?.roles || [];
            token.disabled = user?.disabled || false;
            token.id = user.id;
        }

        return token;
    },
    async session({ session, token }) {
        session.user.roles = token.roles;
        session.user.id = token.id;
        session.user.disabled = token.disabled;

        // console.log({ session, token });

        // do token stuff here
        // check validity of token and give new one if not banned

        return session;
    },
};

const options = {
    adapter: SequelizeAdapter(sequelize, {
        models: {
            ...MODELS,
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
