import { models } from "@next-auth/sequelize-adapter";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../helpers/sequelize";

class User extends Model {
	comparePassword(password: string) {
		return bcrypt.compareSync(password, this["hash_password"]);
	}
}

User.init(
	{
		...models.User,
		username: DataTypes.STRING,
		hash_password: DataTypes.STRING,
		roles: DataTypes.ARRAY(DataTypes.STRING),
		collection: DataTypes.ARRAY(DataTypes.UUID),
		posts: DataTypes.ARRAY(DataTypes.UUID),
		reviews: DataTypes.ARRAY(DataTypes.UUID),
		comments: DataTypes.ARRAY(DataTypes.UUID),
	},
	{
		sequelize,
		modelName: "user",
	}
);

export default User;
