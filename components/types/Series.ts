import { DiscType } from "./Disc";

export interface SeriesType {
	original_name: string;
	name: string;
	overview: string;
	first_air_date: Date;
	children: DiscType[];
	id: string;
}
