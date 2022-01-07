import { signIn } from "next-auth/react";

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
		signIn("credentials", { email, password });
	} else {
		const parsed = await response.json();
		throw parsed.message;
	}
};
