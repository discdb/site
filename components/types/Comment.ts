import { UserData } from "./User";

export interface Comment {
	title: string;
	description: string;
	created_by: UserData;
	created_time: Date;
	id: string;
}
