export interface BlogPost {
	title: string;
	image: string;
	body: string;
	createdAt: Date;
	// created_by: UserData[];
	identifier: string;
}
export interface PostPage {
	title: string;
	image: string;
	body: string;
	createdAt: Date;
	createdBy: string;
	// createdAt: Date;
	// updatedAt: Date;
	// createdBy: UserData[];
	// comments: Comment[];
	identifier: string;
}
