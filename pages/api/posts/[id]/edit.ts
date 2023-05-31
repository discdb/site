import { NextApiRequest, NextApiResponse } from "next";

import { authHandler } from "../../../../helpers/api";
import { allowBloggerRole } from "../../../../helpers/auth";
import { BlogPost } from "../../../../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const post = JSON.parse(req.body);

    // Impose character limits
    if (post.title.length > 100 || post.body.length > 10000)
        return res.status(500).json({ error: "Bad title or body!" });

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
