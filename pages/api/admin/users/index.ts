import { NextApiRequest, NextApiResponse } from 'next';

import { authHandler } from '../../../../helpers/api';
import { allowAdminOnly } from '../../../../helpers/auth';
import { User } from '../../../../models';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const maxLimit = 100;
	const page = parseInt(req.query.page as string) || 1;
	const limit =
		parseInt(req.query.limit as string) > maxLimit
			? maxLimit
			: parseInt(req.query.limit as string) || 10;
	const offset = (page - 1) * limit;

	const results = await User.findAll({
		limit,
		offset,
		order: [['createdAt', 'DESC']],
		attributes: { exclude: ['hash_password'] }
	});

	return res.status(200).json({ page, results, total: results.length });
}

export default authHandler(
	{
		get: handler
	},
	allowAdminOnly
);
