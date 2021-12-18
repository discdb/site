import { API_URL } from "../../helpers/api";

export const createPost = async (title: string, body: string) => {
	const response = await fetch(API_URL + `/blog/create`, {
		method: "POST",
	});

	if (response.ok) {
		const { post } = await response.json();
		return post;
	} else {
		throw response.statusText;
	}
};
