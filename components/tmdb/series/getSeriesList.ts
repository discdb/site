const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/tv/top_rated";

export const getSeriesList = async () => {
	const response = await fetch(`${apiURL}/?&api_key=${apiKey}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const series = await response.json();

	return series.results.map(
		({
			original_name,
			name,
			overview,
			first_air_date,
			poster_path,
			id,
		}) => {
			return {
				original_name,
				name,
				overview,
				first_air_date,
				poster_path,
				id,
			};
		}
	);
};
