import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { authHandler } from "../../../../helpers/api";
import { allowAdminOnly } from "../../../../helpers/auth";
import { Image } from "../../../../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session: any = await getSession({ req });

    const { fileName, fileUrl } = req.body;

    if (!fileName || !fileUrl)
        return res.status(422).json({ error: "Missing fileName or fileUrl!" });

    if (session?.user?.id) {
        const image = await Image.create({
            fileName,
            fileUrl,
            uploadedById: session.user.id,
        });

        return res.status(200).json({
            ...image.toJSON(),
            uploadedById: undefined,
            uploadedBy: {
                image: session.user.image,
                name: session.user.name,
                id: session.user.id,
            },
        });
    }
    return res.status(500);
}

export default authHandler(
    {
        post: handler,
    },
    allowAdminOnly
);
