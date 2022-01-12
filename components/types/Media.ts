import { UserData } from "./User";

export interface DiscType {
	video: {
		resolution: string;
		aspect_ratio: string;
		original_aspect_ratio: string;
		hdr: string;
	};
	audio: string[];
	subtitles: string[];
	type: string;
	size: string;
	regions: string[];
	identifier: string;
}

export interface MediaType {
	title: string;
	edition: string;
	licensor: string;
	distributor: string;
	upc: number;
	ean: number;
	isbn: string;
	sku: string;
	runtime: number;
	sale_region: string;
	images: string[];
	extras: string;
	notes: string;
	volume: string;
	audio_languages: string[];
	release_date: Date;
	msrp: number;
	currency: string;
	primary_type: string;
	adult: boolean;
	identifier: string;
	discs: DiscType[];
	createdBy: UserData;
	createdAt: Date;
}
