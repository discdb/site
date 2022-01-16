import { NextApiRequest, NextApiResponse } from "next";

import { authHandler } from "../../../helpers/api";

const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/search/tv/";

export const searchSeries = async (query: string) => {
	const response = await fetch(
		`${apiURL}/?api_key=${apiKey}&query=${query}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	const series = await response.json();

	return series;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { query } = req;
	const { results } = await searchSeries(query.data as string);

	return res.status(200).send({ results });
}

export default authHandler({
	get: handler,
});
