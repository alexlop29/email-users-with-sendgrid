import { S3 } from "aws-sdk";

const s3 = new S3({ apiVersion: "2006-03-01" });

export { s3 };
