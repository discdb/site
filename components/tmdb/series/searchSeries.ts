import { LOCAL_API_URL } from "../../../helpers/api";

export const searchSeries = async (query: string) => {
	const response = await fetch(
		`${LOCAL_API_URL}/series/search?data=${query}`,
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
