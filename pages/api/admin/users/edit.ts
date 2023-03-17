import { NextApiRequest, NextApiResponse } from 'next';

import { authHandler } from '../../../../helpers/api';
import { allowAdminOnly } from '../../../../helpers/auth';
import { User } from '../../../../models';

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const user = JSON.parse(req.body);

	const result = await User.update(
		{ roles: user?.roles, name: user?.name, email: user?.email },
		{
			where: { id: user.id },
			returning: true
		}
	);

	return res.status(200).json({ result: result[1][0] });
}

export default authHandler(
	{
		post: handler
	},
	allowAdminOnly
);
