import { DiscType } from "./Disc";
import { BlogPost } from "./Post";

export interface User {
	email: string;
	password: string;
}
export interface UserData {
	username: string;
	user_id: string;
}
export interface Profile {
	username: string;
	name: string;
	posts: BlogPost[];
	collection: DiscType[];
	created_time: Date;
	id: string;
}
