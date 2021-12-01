const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/movie/";

export const getMovieFromAPI = async (movieId: string) => {
	const response = await fetch(`${apiURL}/${movieId}?api_key=${apiKey}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const movies = await response.json();
	return movies;
};
