import { DataTypes, Model, TextLength } from "sequelize";

import { sequelize } from "../helpers/sequelize";
import User from "./User";

class BlogPost extends Model {
    static createdBy: any;
}

BlogPost.init(
    {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false,
        },
        title: DataTypes.STRING(250),
        image: DataTypes.STRING(1000),
        body: DataTypes.STRING(10000),
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
        modelName: "blog_post",
    }
);

export default BlogPost;
