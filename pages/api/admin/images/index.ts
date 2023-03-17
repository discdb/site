import { NextApiRequest, NextApiResponse } from "next";
import { Image } from "../../../../models";

import { authHandler } from "../../../../helpers/api";
import { User } from "../../../../models";
import { allowAdminOnly } from "../../../../helpers/auth";
import { sanitizeKey } from "next-s3-upload";
import { s3 } from "../../../../helpers/s3";

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    const maxLimit = 100;
    const page = parseInt(req.query.page as string) || 1;
    const limit =
        parseInt(req.query.limit as string) > maxLimit
            ? maxLimit
            : parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const results = await Image.findAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
        attributes: { exclude: ["uploadedById"] },
        include: [
            {
                model: User,
                required: true,
                as: "uploadedBy",
                attributes: ["name", "image", "id"],
            },
        ],
    });

    return res.status(200).send({ page, results, total: results.length });
}

async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    const { fileName, uploadedBy: uploadedById } = JSON.parse(req.body);

    return fileName && uploadedById
        ? s3.deleteObject(
              {
                  Bucket: "i.dvdb.video",
                  Key: `i/images/${sanitizeKey(fileName)}`,
              },
              async (err, data) => {
                  if (!err) {
                      const result = await Image.destroy({
                          where: { fileName, uploadedById },
                      });

                      return res
                          .status(200)
                          .send({ message: "Image deleted!" });
                  }
                  return res.status(500).send({ message: err.code });
              }
          )
        : res
              .status(404)
              .send({ message: "fileName or uploadedById not provided!" });
}

export default authHandler(
    {
        get: getHandler,
        delete: deleteHandler,
    },
    allowAdminOnly
);
