import { UserData } from "./User";

export interface DiscType {
	title: string;
	image: string;
	description: string;
	added_by: UserData;
	added_time: Date;
	type: string;
	id: string;
}
