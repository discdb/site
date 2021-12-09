import { Comment } from "./Comment";
import { UserData } from "./User";

export interface BlogPost {
	title: string;
	image: string;
	body: string;
	// created_time: Date;
	// created_by: UserData[];
	identifier: string;
}
export interface PostPage {
	title: string;
	image: string;
	body: string;
	// createdAt: Date;
	// updatedAt: Date;
	// createdBy: UserData[];
	// comments: Comment[];
	identifier: string;
}
