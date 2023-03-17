import { NextApiRequest, NextApiResponse } from "next";

import { apiHandler } from "../../../../helpers/api";
import { BlogPost, User } from "../../../../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const result = await BlogPost.findOne({
        where: { id },
        attributes: { exclude: ["createdById"] },
        include: [
            {
                model: User,
                required: true,
                as: "createdBy",
                attributes: ["name", "image", "id"],
            },
        ],
    });

    return res.status(200).send({ result });
}

export default apiHandler({
    get: handler,
});
