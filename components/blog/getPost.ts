import { API_URL } from "../../helpers/api";

export const getPostFromAPI = async (identifier) => {
	const response = await fetch(API_URL + `/blog/${identifier}`);

	const { post } = await response.json();

	return post;
};
