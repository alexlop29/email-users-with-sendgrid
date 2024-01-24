import * as dotenv from "dotenv";
dotenv.config();

export const MONGO_DB_URI = process.env.MONGO_DB_URI;
export const EXPRESS_PORT = process.env.EXPRESS_PORT;
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME ?? "";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const SENDGRID_DOMAIN_EMAIL = process.env.SENDGRID_DOMAIN_EMAIL;
export const COMPANY_NAME = process.env.COMPANY_NAME;
