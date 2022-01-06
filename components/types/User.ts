import { BlogPost } from "./Post";

export interface User {
	email: string;
	password: string;
}
export interface UserData {
	username: string;
	user_id: string;
}

export interface RegisterUserType {
	email: string;
	password: string;
	fullName: string;
	username: string;
}
