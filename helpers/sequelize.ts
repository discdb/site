const globalAny: any = global;
import { Sequelize } from "sequelize";

const DATABASE: string = process.env.DATABASE || "";
const USER: string = process.env.USER || "";
const PASSWORD: string = process.env.PASSWORD || "";

let cached = globalAny.sequelize;

if (!cached) {
	cached = globalAny.sequelize = { conn: null, promise: null };
}

export const sequelize: Sequelize = new Sequelize(
	`postgres://${USER}:${PASSWORD}@127.0.0.1:5432/${DATABASE}`
);

async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = sequelize.authenticate().then((sequelize) => {
			return sequelize;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default connectDB;
