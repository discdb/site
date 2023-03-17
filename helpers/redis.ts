const globalAny: any = global;
import * as redis from "redis";

let cached = globalAny.redis;

if (!cached) {
    cached = globalAny.redis = { conn: null, promise: null };
}

export const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_IP,
        keepAlive: false,
    },
    password: process.env.REDIS_PASSWORD,
});

async function connectRedis() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = redisClient.connect().then((redis) => {
            return redis;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

redisClient.on("connect", () => {
    console.log("Connected to Redis Server");
});

export const isValidToken = async (token: string) => {
    try {
        await connectRedis();
        const doesTokenExist = await redisClient.get(`dvdb_${token}`);

        return !!doesTokenExist;
    } catch (err) {
        console.log(err);
    }
};

export const setNewToken = async (token: string, expiresAt: number) => {
    try {
        await connectRedis();
        await redisClient.set(`dvdb_${token}`, token);
        await redisClient.expireAt(`dvdb_${token}`, expiresAt);

        return "Token Set";
    } catch (err) {
        console.log(err);
    }
};

export default connectRedis;

// class Redis {
//     redis: any;
//     constructor() {
//         this.redis = redis.createClient({
//             socket: {
//                 host: process.env.REDIS_IP,
//             },
//             password: process.env.REDIS_PASSWORD,
//         });

//         this.redis.connect();

//         this.redis.on("connect", () =>
//             console.log("Connected to Redis Server")
//         );
//     }

// }

// export default new Redis();
