import { MovieType } from './Movie';
import { SeriesType } from './Series';

interface AudioFormat {
	language: string;
	format: string;
}

export interface DiscType {
	video: {
		resolution: string;
		aspect_ratio: string;
		original_aspect_ratio: string;
		hdr: string;
	};
	metadata: string;
	audio: AudioFormat[];
	subtitles: string[];
	format: string;
	size: string;
	regions: string[];
}

export interface MediaType {
	title: string;
	cover: string;
	description: string;
	primary_type: string;
	discs: DiscType[];
	distribution_info: {
		licensor: string;
		distributor: string;
		sale_region: string;
		msrp: number;
		currency: string;
		release_date: Date;
	};
	identifiers: {
		upc: number;
		ean: number;
		isbn: string;
		sku: string;
	};
	other_details: {
		volume: string;
		edition: string;
		audio_languages: string[];
		adult: boolean;
		runtime: number;
		notes: string;
	};
	id: string;
	createdBy: string;
	createdAt: Date;
}

export interface MovieSeriesType {
	media: (MovieType & SeriesType) & { media_type: string };
}
