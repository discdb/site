const globalAny: any = global;
import { Sequelize } from "sequelize";

let cached = globalAny.sequelize;

if (!cached) {
    cached = globalAny.sequelize = { conn: null, promise: null };
}

const DATABASE: string = process.env.DATABASE || "";
const USER: string = process.env.USER || "";
const PASSWORD: string = process.env.PASSWORD || "";

export const sequelize: Sequelize =
    process.env.NODE_ENV == "development"
        ? new Sequelize(
              `postgres://${USER}:${PASSWORD}@127.0.0.1:5432/${DATABASE}`
          )
        : new Sequelize(DATABASE, "postgres", undefined, {
              host: "/var/run/postgresql",
              dialect: "postgres",
          });

sequelize.sync({ alter: true });

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
