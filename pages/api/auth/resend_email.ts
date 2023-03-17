import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../../helpers/api";
import Mailer from "../../../helpers/mailer";
import { User } from "../../../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = JSON.parse(req.body);

    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) return res.status(404);

    await Mailer.sendConfirmEmail(existingUser.toJSON());

    return res.status(200).send({
        message: "Email successfully resent.",
    });
}

export default apiHandler({ post: handler });
