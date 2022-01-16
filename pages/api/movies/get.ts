import { NextApiRequest, NextApiResponse } from "next";

import { authHandler } from "../../../helpers/api";

const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/movie/top_rated";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { query } = req;
	const response = await fetch(
		`${apiURL}/?&api_key=${apiKey}&page=${query.page || 1}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	const { results } = await response.json();
	return res.status(200).send({ results });
}

export default authHandler({
	get: handler,
});
