import { NextApiRequest, NextApiResponse } from "next";
import { apiHandler } from "../../../helpers/api";
import { isValidToken } from "../../../helpers/redis";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // await redisClient.LPUSH("token", "test_token_data");
        const inDenyList = await isValidToken("test_token");
        // await redisClient.set("dvdb_test_token", "test_token");
        console.log(inDenyList);

        return res.status(200).send({
            message: inDenyList,
        });
    } catch (err) {
        console.log(err);
    }
}

export default apiHandler({ post: handler });
