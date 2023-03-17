import { models } from "@next-auth/sequelize-adapter";
import { DataTypes, Model } from "sequelize";

import { sequelize } from "../helpers/sequelize";

class User extends Model {
    static Posts: any;
    static Media: any;
    static id: any;
    static username: any;
}

User.init(
    {
        ...models.User,
        username: DataTypes.STRING,
        hash_password: DataTypes.STRING,
        roles: DataTypes.ARRAY(DataTypes.STRING),
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "user",
    }
);

export default User;
