import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { Op } from "sequelize";

import { apiHandler } from "../../../helpers/api";
import Mailer from "../../../helpers/mailer";
import { User } from "../../../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        body: { email, password, name, username },
    } = req;

    if (
        !email ||
        !password ||
        email.length > 128 ||
        password.length > 64 ||
        name.length > 64 ||
        username.length > 16
    )
        return res.status(400).send({ message: "Invalid request body." });

    const existingUser = await User.findOne({
        where: {
            [Op.or]: [{ email }, { username }],
        },
    });

    if (!existingUser) {
        const newUser = await User.create({
            name,
            username,
            email,
            hash_password: bcrypt.hashSync(password, 10),
        });

        await Mailer.sendConfirmEmail(newUser.toJSON());

        newUser &&
            res.status(200).send({
                user: {
                    name,
                    username,
                    email,
                },
            });
    } else {
        res.status(409).send({
            message: "Account with this email or username already exists!",
        });
    }

    Promise.resolve({});
}

export default apiHandler({ post: handler });
