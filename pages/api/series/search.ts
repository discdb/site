import { getSession } from "next-auth/client";

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
async function handler(req: any, res: any) {
	const { method, query } = req;
	const session = await getSession({ req });

	return new Promise(async (resolve) => {
		if (method == "GET" && session?.user) {
			const { results } = await searchSeries(query.data);
			return resolve(res.status(200).send({ results }));
		} else {
			return resolve(res.status(400).send());
		}
	});
}
export default handler;
