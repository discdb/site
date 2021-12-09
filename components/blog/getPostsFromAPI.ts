import { API_URL } from "../api";

export const getPostsFromAPI = async (limit: number = 3, page: number = 1) => {
	const response = await fetch(API_URL + `/blog?limit=${limit}&page=${page}`);

	const { posts } = await response.json();

	return posts;
};
