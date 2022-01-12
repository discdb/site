import { signIn } from "next-auth/react";
import { User } from "../../types/User";

export const loginUser = async ({ email, password }: User) => {
	signIn("credentials", { email, password });
};
