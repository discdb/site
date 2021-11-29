const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/search/tv/";

export const searchSeries = async ({ query }) => {
	const response = await fetch(
		`${apiURL}/?query=${query}&api_key=${apiKey}`,
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
