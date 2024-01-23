/*
Would like to retrieve the file contents from S3
file name will be stored in the database to associate with the user!
*/

/*
Need to consider how commit ATOMIC transaction of user data upload to mongodb
and s3 storage.
*/
import { randomUUID } from "crypto";
import { ResponseError } from "../handler/error";

class Document {
  public name: string | undefined;

  constructor(
    private readonly file: Express.Multer.File, // replace with multer // will contain file contents
  ) {}

  rename() {
    try {
      this.name = randomUUID();
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  async save() {}
}

export { Document };
