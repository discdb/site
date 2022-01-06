// import { MediaType, DiscType } from "./Media";
// import { UserData } from "./User";

export interface SeriesType {
	original_name: string;
	name: string;
	overview: string;
	first_air_date: Date;
	poster_path: string;
	// children: DiscType[];
	id: string;
}
// export interface Season {
// 	title: string;
// 	episodes: number;
// 	season_number: number;
// }
// export interface SeriesType {
// 	original_name: string;
// 	name: string;
// 	overview: string;
// 	poster_path: string;
// 	first_air_date: Date;
// 	last_air_date: Date;
// 	adult: boolean;
// 	original_language: string;
// 	genres: string[];
// 	origin_country: string;
// 	identifier: string;
// 	tmdb_id: number;
// 	seasons: Season[];
// 	releases: MediaType[];
// 	details: {
// 		createdBy: UserData;
// 		createdAt: Date;
// 	};
// }
