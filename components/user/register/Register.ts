import { LOCAL_API_URL } from "../../../helpers/api";

import { RegisterUserType } from "../../types/User";

export const registerUser = async ({
	email,
	password,
	fullName,
	username,
}: RegisterUserType) => {
	const response = await fetch(`${LOCAL_API_URL}/auth/register`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
			fullName,
			username,
		}),
	});

	if (response.ok) {
		const { user } = await response.json();

		return user;
	} else {
		throw response.statusText;
	}
};
