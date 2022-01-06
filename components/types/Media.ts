import { UserData } from "./User";

export interface DiscType {
	type: string;
	size: string;
}

export interface MediaType {
	title: string;
	edition: string;
	licensor: string;
	distributor: string;
	discs: DiscType[];
	upc: number;
	ean: number;
	isbn10: number;
	isbn13: number;
	sku: string;
	runtime: number;
	sale_region: string;
	disc_region: string;
	cover: string;
	description: string;
	volume: string;
	audio_languages: string[];
	subtitles: string[];
	release_date: Date;
	msrp: number;
	currency: string;
	notes: string;
	adult: boolean;
	identifier: string;
	primary_type: string;
	details: {
		createdBy: UserData;
		createdAt: Date;
	};
}
