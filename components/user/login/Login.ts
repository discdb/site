import { signIn } from "next-auth/react";
import { User } from "../../types/User";

// const setToken = (accessToken: string) => {
// 	localStorage.setItem("accessToken", JSON.stringify(accessToken));
// };

// const getToken = () => {
// 	const tokenString = localStorage.getItem("accessToken") || "";
// 	const userToken: string = JSON.parse(tokenString);
// 	return userToken ? userToken : false;
// };

export const loginUser = async ({ email, password }: User) => {
	signIn("credentials", { email, password });
};
