const apiKey = process.env.TMDB_API_KEY;
const apiURL = "https://api.themoviedb.org/3/movie/";

export const getMovieFromAPI = async (movieId: string) => {
	const getMovieFrom3rdParty = async () => {
		const response = await fetch(`${apiURL}/${movieId}?api_key=${apiKey}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	};

	const getMovieFromDB = async () => {
		return false;
	};

	const dbResponse = await getMovieFromDB();
	const movie = dbResponse ? dbResponse : await getMovieFrom3rdParty();

	return movie;
};
