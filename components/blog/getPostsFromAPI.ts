import { API_URL } from "../../helpers/api";

export const getPostsFromAPI = async (limit = 3, page = 1) => {
	const response = await fetch(API_URL + `/blog?limit=${limit}&page=${page}`);

	const { posts } = await response.json();

	return posts;
};
