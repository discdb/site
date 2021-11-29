import { User } from "../../types/User";

export const registerUser = async ({ email, password }: User) => {
	console.log(email, password);
};
