import { Sequelize } from "sequelize";

const DATABASE: string = process.env.DATABASE || "";
const USER: string = process.env.USER || "";
const PASSWORD: string = process.env.PASSWORD || "";

export const sequelize = new Sequelize(
	`postgres://${USER}:${PASSWORD}@127.0.0.1:5432/${DATABASE}`
);
