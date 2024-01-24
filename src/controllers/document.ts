/*
Would like to retrieve the file contents from S3
file name will be stored in the database to associate with the user!
*/

/*
Need to consider how commit ATOMIC transaction of user data upload to mongodb
and s3 storage.
Consider calling Document.rename(), User.validate(), User.Save(), Document.Save()
*/
import { randomUUID } from "crypto";
import { ResponseError } from "../handler/error";
import { Response } from "../handler/response";
import { S3 } from "aws-sdk";
import { AWS_S3_BUCKET_NAME } from "../config/environment";
import { s3 } from "../config/s3";

class Document {
  public name = "";

  constructor(private readonly file: Express.Multer.File) {}

  rename(): Response | ResponseError {
    try {
      this.name = randomUUID();
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  async save(): Promise<Response | ResponseError> {
    try {
      let params: S3.Types.PutObjectRequest = {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: this.name,
        Body: this.file.buffer,
      };
      await s3.upload(params);
      return new Response(200, "OK");
    } catch (error) {
      console.log(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { Document };
