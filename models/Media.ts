import { DataTypes, Model } from "sequelize";

import { sequelize } from "../helpers/sequelize";
import User from "./User";

class Media extends Model {
    static createdBy: any;
}

Media.init(
    {
        title: DataTypes.STRING,
        images: DataTypes.ARRAY(DataTypes.STRING),
        description: DataTypes.STRING(5000),
        primary_type: DataTypes.TEXT,
        discs: DataTypes.ARRAY(DataTypes.TEXT),
        distribution_info: DataTypes.TEXT,
        identifiers: DataTypes.TEXT,
        other_details: DataTypes.TEXT,
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false,
        },
        createdById: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "media",
    }
);

export default Media;
