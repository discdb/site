import { API_URL } from "../../helpers/api";

export const createPost = async (
	title: string,
	body: string,
	createdBy: string
) => {
	const response = await fetch(API_URL + `/blog/`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title,
			body,
			createdBy,
		}),
	});

	if (response.ok) {
		const { post } = await response.json();
		return post;
	} else {
		throw response.statusText;
	}
};
