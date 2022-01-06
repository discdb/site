import { models } from "@next-auth/sequelize-adapter";
import { DataTypes } from "sequelize";
import { sequelize } from "../helpers/sequelize";

const UserModel = sequelize.define("user", {
	...models.User,
	hash_password: DataTypes.STRING,
	roles: DataTypes.ARRAY(DataTypes.STRING),
	collection: DataTypes.ARRAY(DataTypes.UUID),
	posts: DataTypes.ARRAY(DataTypes.UUID),
	reviews: DataTypes.ARRAY(DataTypes.UUID),
	comments: DataTypes.ARRAY(DataTypes.UUID),
});

export default UserModel;
