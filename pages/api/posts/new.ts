import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import randomstring from "randomstring";

import { authHandler } from "../../../helpers/api";
import { allowBloggerRole } from "../../../helpers/auth";
import { BlogPost } from "../../../models/";

const generateIdentifier = () => {
    const id = randomstring.generate(7);

    BlogPost.findOne({ where: { id } }).then((result) => {
        if (result !== null) {
            return generateIdentifier();
        }
    });

    return id;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session: any = await getSession({ req });
    const { title, body } = req.body;

    if (!title || !body)
        return res.status(422).json({ error: "Missing title or body!" });

    if (session?.user?.id) {
        const postId = generateIdentifier().trim();

        const post = await BlogPost.create({
            title,
            body,
            createdById: session.user.id,
            id: postId,
        });

        await res.revalidate(`/blog/${postId}`);

        return res.status(200).json({
            result: {
                ...post.toJSON(),
                createdById: undefined,
                createdBy: {
                    name: session.user.name,
                    id: session.user.id,
                    image: session.user.image,
                },
            },
        });
    }

    return res.status(500);
}

export default authHandler(
    {
        post: handler,
    },
    allowBloggerRole
);
