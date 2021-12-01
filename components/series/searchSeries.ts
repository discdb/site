const API_URL =
	process.env.NODE_ENV == "development"
		? "http://localhost:3000"
		: "https://dvdb.milk.ovh";

export const searchSeries = async (query: string) => {
	const response = await fetch(`${API_URL}/api/series/search?data=${query}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const series = await response.json();
	const { results } = series;
	return results;
};
