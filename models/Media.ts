import { models } from "@next-auth/sequelize-adapter";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../helpers/sequelize";
import { MediaType, DiscType } from "../components/types/Media";
import Disc from "./Disc";

class Media extends Model {
	// declare title: string;
	// declare edition: string;
	// declare licensor: string;
	// declare distributor: string;
	// declare discs: DiscType[];
	// declare upc: INTEGER;
	// declare ean: INTEGER;
	// declare isbn: string;
	// declare sku: string;
	// declare runtime: INTEGER;
	// declare sale_region: string;
	// declare disc_region: string;
	// declare cover: string;
	// declare description: string;
	// declare volume: string;
	// declare audio_languages: string[];
	// declare subtitles: string[];
	// declare release_date: Date;
	// declare msrp: INTEGER;
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
		upc: DataTypes.INTEGER,
		ean: DataTypes.INTEGER,
		isbn: DataTypes.STRING,
		sku: DataTypes.STRING,
		runtime: DataTypes.INTEGER,
		sale_region: DataTypes.STRING,
		images: DataTypes.ARRAY(DataTypes.STRING),
		extras: DataTypes.TEXT,
		notes: DataTypes.TEXT,
		volume: DataTypes.STRING,
		audio_languages: DataTypes.ARRAY(DataTypes.STRING),
		subtitles: DataTypes.ARRAY(DataTypes.STRING),
		release_date: DataTypes.DATE,
		msrp: DataTypes.DECIMAL,
		currency: DataTypes.STRING,
		primary_type: DataTypes.STRING,
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

Media.hasMany(Disc, { as: "discs" });

export default Media;
