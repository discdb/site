import { LOCAL_API_URL } from "../../../helpers/api";

export const searchMovies = async (query: string) => {
	const response = await fetch(
		`${LOCAL_API_URL}/movies/search?data=${query}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (response.ok) {
		const { results } = await response.json();
		return results;
	} else {
		throw response.statusText;
	}
};
