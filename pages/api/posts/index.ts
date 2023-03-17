import { NextApiRequest, NextApiResponse } from "next";

import { apiHandler } from "../../../helpers/api";
import { BlogPost, User } from "../../../models/";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const maxLimit = 100;
        const page = parseInt(req.query.page as string) || 1;
        const limit =
            parseInt(req.query.limit as string) > maxLimit
                ? maxLimit
                : parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;

        const results = await BlogPost.findAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]],
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

        return res.status(200).send({ page, results, total: results.length });
    } catch (err) {
        console.log(err);
    }
}

export default apiHandler({
    get: handler,
});
