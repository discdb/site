import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { confirmEmailTemplate } from "../data/confirmEmailTemplate";
import { isValidToken, setNewToken } from "./redis";

class Mailer {
    transport: any;
    constructor() {
        this.transport = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            secure: true,
            auth: {
                user: "admin@dvdb.video",
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async sendMessage(to: string, subject: string, text: string, html: string) {
        const mailOptions = {
            from: "noreply@dvdb.video",
            to,
            subject,
            text,
            html,
        };

        await this.transport.sendMail(mailOptions);
    }

    async sendConfirmEmail(user: any) {
        const mailOptions = {
            from: "noreply@dvdb.video",
            to: user.email,
            subject: "Confirm Email",
        };

        jwt.sign(
            {
                user: user.id,
            },
            process.env.EMAIL_TOKEN_SECRET as any,
            { expiresIn: "2d" },
            async (err, emailToken) => {
                console.log(err);

                await this.transport.sendMail({
                    ...mailOptions,
                    html: confirmEmailTemplate(emailToken),
                });
            }
        );
    }

    async confirmEmail(token: string) {
        try {
            const decoded = jwt.verify(
                token,
                process.env.EMAIL_TOKEN_SECRET as any
            ) as any;

            const isInvalid = await isValidToken(token);

            if (isInvalid) return false;

            await setNewToken(token, decoded.exp);
            const result = await User.update(
                { emailVerified: new Date() },
                { where: { id: decoded.user } }
            );

            return true;
        } catch (err) {
            console.log(err);
        }
    }
    async sendPasswordResetEmail(user: any) {
        const mailOptions = {
            from: "noreply@dvdb.video",
            to: user.email,
            subject: "Password Reset",
        };

        jwt.sign(
            {
                user: user.id,
                email: user.email,
            },
            process.env.EMAIL_TOKEN_SECRET as any,
            { expiresIn: "1h" },
            async (err, passwordResetToken) => {
                console.log(err);

                await this.transport.sendMail({
                    ...mailOptions,
                    html: confirmEmailTemplate(passwordResetToken),
                });
            }
        );
    }

    async confirmPasswordResetToken(token: string) {
        try {
            const isInvalid = await isValidToken(token);

            if (isInvalid) return false;

            const { user: id, email } = jwt.verify(
                token,
                process.env.EMAIL_TOKEN_SECRET as any
            ) as any;

            return { valid: true, email, id };
        } catch (err) {
            console.log(err);
        }
    }
}

export default new Mailer();
