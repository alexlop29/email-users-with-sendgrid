import { user } from "../models/user";
import { ResponseError } from "../handler/error";
import { Response } from "../handler/response";

class User {
  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly resume: string, // will contain the name of the file // may change to ObjectID
  ) {}

  validate() {
    // validates the user's information
  }

  async save() {
    try {
      const User = new user({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        resume: this.resume,
      });
      await User.save();
      return new Response(200, "OK");
    } catch (error: any) {
      console.log(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { User };
