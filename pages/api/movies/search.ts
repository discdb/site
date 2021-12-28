import { authHandler } from "../../../helpers/api";

const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/search/movie/";

export const searchMovies = async (query: string) => {
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

async function handler(req: any, res: any) {
	const { query } = req;
	const { results } = await searchMovies(query.data);

	return res.status(200).send({ results });
}

export default authHandler({
	get: handler,
});
