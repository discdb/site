import { DiscType } from "./Disc";

export interface MovieType {
	original_title: string;
	title: string;
	overview: string;
	release_date: Date;
	children: DiscType[];
	id: string;
}
