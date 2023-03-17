import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const API_URL =
    process.env.NODE_ENV == "production"
        ? "https://dvdb.video/api"
        : "http://192.168.1.191:4000/api";

export const LOCAL_API_URL =
    process.env.NODE_ENV == "production"
        ? "https://dvdb.video/api"
        : "http://localhost:3000/api";

export const TMDB_API_URL = "https://api.themoviedb.org/3";
export const TMDB_API_KEY = process.env.TMDB_API_KEY;

const errorHandler = (err: any, res: NextApiResponse) => {
    return res.status(err.method).end();
};

export const authHandler =
    (handler: any, roleHandler?: Function) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        const method = req?.method ? req.method.toLowerCase() : "";

        if (!handler[method]) return res.status(405).end();

        try {
            const session = await getSession({ req });

            if (roleHandler ? roleHandler(session) : session) {
                await handler[method](req, res);
            } else throw { method: 401 };
        } catch (err) {
            errorHandler(err, res);
        }
    };

export const apiHandler = (handler: any) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const method = req?.method ? req.method.toLowerCase() : "";

        if (!handler[method]) return res.status(405).end();

        try {
            await handler[method](req, res);
        } catch (err) {
            errorHandler(err, res);
        }
    };
};
