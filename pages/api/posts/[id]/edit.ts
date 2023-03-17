import { NextApiRequest, NextApiResponse } from "next";

import { authHandler } from "../../../../helpers/api";
import { allowBloggerRole } from "../../../../helpers/auth";
import { BlogPost } from "../../../../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const post = JSON.parse(req.body);

    const result = await BlogPost.update(
        { title: post.title, body: post.body },
        {
            where: { id: post.id },
            returning: true,
        }
    );
    await res.revalidate(`/blog/${post.id}`);

    return res.status(200).json({ result: result[1][0] });
}

export default authHandler(
    {
        post: handler,
    },
    allowBloggerRole
);
