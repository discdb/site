import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const API_URL =
	process.env.NODE_ENV == "production"
		? "https://api.dvdb.video/api"
		: "http://localhost:4000/api";

export const LOCAL_API_URL =
	process.env.NODE_ENV == "production"
		? "https://dvdb.video/api"
		: "http://localhost:3000/api";

const errorHandler = (err: any, res: NextApiResponse) => {
	return res.status(err.method).end();
};

export const authHandler = (handler: any) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const method = req.method.toLowerCase();

		if (!handler[method]) return res.status(405).end();

		try {
			const session = await getSession({ req });
			if (session) {
				await handler[method](req, res);
			} else throw { method: 401 };
		} catch (err) {
			errorHandler(err, res);
		}
	};
};

export const apiHandler = (handler: any) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const method = req.method.toLowerCase();

		if (!handler[method]) return res.status(405).end();

		try {
			await handler[method](req, res);
		} catch (err) {
			errorHandler(err, res);
		}
	};
};
