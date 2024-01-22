import * as dotenv from "dotenv";
dotenv.config();

export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const EXPRESS_PORT = process.env.EXPRESS_PORT;
