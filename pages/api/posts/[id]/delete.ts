import { NextApiRequest, NextApiResponse } from "next";

import { authHandler } from "../../../../helpers/api";
import { allowBloggerRole } from "../../../../helpers/auth";
import { BlogPost } from "../../../../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const result = await BlogPost.destroy({
        where: { id: id },
    });

    await res.revalidate(`/blog/${id}`);

    return res.status(200).json({ message: "Post deleted." });
}

export default authHandler(
    {
        post: handler,
    },
    allowBloggerRole
);
