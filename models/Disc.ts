import { DataTypes, Model } from "sequelize";

import { sequelize } from "../helpers/sequelize";

class Disc extends Model {}

Disc.init(
	{
		"video.resolution": DataTypes.STRING,
		"video.aspect_ratio": DataTypes.STRING,
		"video.orginal_aspect_rato": DataTypes.STRING,
		"video.hdr": DataTypes.STRING,
		audio: DataTypes.ARRAY(DataTypes.STRING),
		subtitles: DataTypes.ARRAY(DataTypes.STRING),
		type: DataTypes.STRING,
		size: DataTypes.STRING,
		regions: DataTypes.STRING,
		identifier: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
	},
	{
		sequelize,
		modelName: "disc",
	}
);

export default Disc;
