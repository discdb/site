import { getSession } from "next-auth/client";

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
	const { method, query } = req;
	const session = await getSession({ req });

	return new Promise(async (resolve) => {
		if (method == "GET" && session?.user) {
			const { results } = await searchMovies(query.data);

			return resolve(res.status(200).send({ results }));
		} else if (!session?.user) {
			return resolve(
				res.status(401).send({
					message: "Unauthorized!",
				})
			);
		}
	});
}
export default handler;
