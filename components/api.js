export const API_URL =
	process.env.NODE_ENV == "production"
		? "https://dvdb.video/api"
		: "http://localhost:4000/api";
