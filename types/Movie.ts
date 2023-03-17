export interface MovieType {
	original_title: string;
	title: string;
	overview: string;
	release_date: Date;
	poster_path: string;
	backdrop_path: string;
	genres: object[];
	adult: boolean;
	runtime: number;
	id: string;
}
