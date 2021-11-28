import { User } from "../../types/User";

// const setToken = (accessToken: string) => {
// 	sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
// };

// const getToken = () => {
// 	const tokenString = sessionStorage.getItem("accessToken") || "";
// 	const userToken: string = JSON.parse(tokenString);
// 	return userToken ? userToken : false;
// };

export const loginUser = async ({ email, password }: User) => {
	console.log(email, password);
};
