import { DataTypes, Model } from "sequelize";

import { sequelize } from "../helpers/sequelize";
import User from "./User";

class Image extends Model {
    static uploadedBy: any;
}

Image.init(
    {
        fileName: DataTypes.TEXT,
        fileUrl: DataTypes.TEXT,
        uploadedById: {
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
        modelName: "image",
    }
);

export default Image;
