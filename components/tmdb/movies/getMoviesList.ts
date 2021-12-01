const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/movie/top_rated";

export const getMoviesList = async () => {
	const response = await fetch(`${apiURL}/?&api_key=${apiKey}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const movies = await response.json();

	return movies.results.map(
		({ original_title, title, overview, release_date, id }) => {
			return {
				original_title,
				title,
				overview,
				release_date,
				id,
			};
		}
	);
};
