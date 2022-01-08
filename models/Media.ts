import { models } from "@next-auth/sequelize-adapter";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../helpers/sequelize";
import { MediaType, DiscType } from "../components/types/Media";

class Media extends Model {
	// declare title: string;
	// declare edition: string;
	// declare licensor: string;
	// declare distributor: string;
	// declare discs: DiscType[];
	// declare upc: number;
	// declare ean: number;
	// declare isbn: string;
	// declare sku: string;
	// declare runtime: number;
	// declare sale_region: string;
	// declare disc_region: string;
	// declare cover: string;
	// declare description: string;
	// declare volume: string;
	// declare audio_languages: string[];
	// declare subtitles: string[];
	// declare release_date: Date;
	// declare msrp: number;
	// declare currency: string;
	// declare notes: string;
	// declare adult: boolean;
	// declare identifier: string;
	// declare primary_type: string;
	// declare details: {
	//     createdBy: JSON,
	//     createdAt: Date,
	// }
}

Media.init(
	{
		title: DataTypes.STRING,
		edition: DataTypes.STRING,
		licensor: DataTypes.STRING,
		distributor: DataTypes.STRING,
		discs: DataTypes.ARRAY(DataTypes.JSON),
		upc: DataTypes.NUMBER,
		ean: DataTypes.NUMBER,
		isbn: DataTypes.STRING,
		sku: DataTypes.STRING,
		runtime: DataTypes.NUMBER,
		cover: DataTypes.STRING,
		description: DataTypes.TEXT,
		volume: DataTypes.STRING,
		audio_languages: DataTypes.ARRAY(DataTypes.STRING),
		subtitles: DataTypes.ARRAY(DataTypes.STRING),
		release_date: DataTypes.DATE,
		msrp: DataTypes.NUMBER,
		currency: DataTypes.STRING,
		notes: DataTypes.TEXT,
		adult: DataTypes.BOOLEAN,
		identifier: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	},
	{
		sequelize,
		modelName: "media",
	}
);

export default Media;
