import { NextApiRequest, NextApiResponse } from "next";

import { apiHandler, TMDB_API_KEY, TMDB_API_URL } from "../../../helpers/api";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(
        `${TMDB_API_URL}/trending/all/week?api_key=${TMDB_API_KEY}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "*",
            },
        }
    );

    const { results } = await response.json();

    return res
        .status(200)
        .send({ results: JSON.parse(JSON.stringify(results)) });
}

export default apiHandler({
    get: handler,
});
