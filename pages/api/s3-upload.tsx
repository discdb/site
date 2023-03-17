import { APIRoute, sanitizeKey } from "next-s3-upload";

export default APIRoute.configure({
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
    bucket: "i",
    region: process.env.S3_UPLOAD_REGION,
    key(req, filename) {
        return `images/${sanitizeKey(filename)}`;
    },
    endpoint: "https://i.dvdb.video",
    forcePathStyle: true,
});
