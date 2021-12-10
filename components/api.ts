export const API_URL =
	process.env.NODE_ENV == "production"
		? "https://api.dvdb.video"
		: "http://localhost:4000/api";
