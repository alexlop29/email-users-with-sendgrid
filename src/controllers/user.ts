import { user } from "../models/user";
import { ResponseError } from "../handler/error";
import { Response } from "../handler/response";

class User {
  profile;

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly resume: string,
  ) {
    this.profile = new user({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      resume: this.resume,
    });
  }

  async validate(): Promise<Response | ResponseError> {
    try {
      await this.profile?.validate();
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(400, "Bad Request");
    }
  }

  async save(): Promise<Response | ResponseError> {
    try {
      await this.profile?.save();
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { User };
