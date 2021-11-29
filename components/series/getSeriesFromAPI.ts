const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/tv/";

export const getSeriesFromAPI = async (seriesId: string) => {
	const response = await fetch(`${apiURL}/${seriesId}?api_key=${apiKey}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const series = await response.json();

	return series;
};
