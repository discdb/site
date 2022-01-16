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
	name: string;
	username: string;
}
