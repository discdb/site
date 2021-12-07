import { Comment } from "./Comment";
import { UserData } from "./User";

export interface BlogPost {
	title: string;
	image: string;
	description: string;
	created_time: Date;
	created_by: UserData[];
	comments: Comment[];
	id: string;
}
