import { user } from "../models/user";
import { ResponseError } from "../handler/error";
import { Response } from "../handler/response";
import { IUser } from "../types/user";

/*
LEFT OFF: CREATING VALIDATION FUNC!
FOLLOW DRY!
*/

class User {
  profile: IUser | undefined;

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly resume: string, // will contain the name of the file // may change to ObjectID
  ) {
    this.profile = new user({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      resume: this.resume,
    });
  }

  validate() {}

  async save(): Promise<Response | ResponseError> {
    try {
      await User.save();
      return new Response(200, "OK");
    } catch (error: any) {
      console.log(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { User };
