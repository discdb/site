import { apiHandler, authHandler } from "../../helpers/api";

async function handler(req: any, res: any) {
	const { method, query } = req;

	res.send({ message: "test!" });
	// return new Promise(async (resolve, reject) => {

	// });
}

export default apiHandler({
	get: handler,
});
