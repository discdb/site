const API_URL =
	process.env.NODE_ENV == "development"
		? "http://localhost:3000"
		: "https://dvdb.milk.ovh";

export const searchMovies = async (query: string) => {
	const response = await fetch(`${API_URL}/api/movies/search?data=${query}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const movies = await response.json();
	const { results } = movies;
	return results;
};
