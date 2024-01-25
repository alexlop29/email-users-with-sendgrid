import { sgMail } from "../config/sendgrid";
import { ResponseError } from "../handler/error";
import { Response } from "../handler/response";
import { reject } from "../templates/reject";
import { accept } from "../templates/accept";
import { acknowledge } from "../templates/acknowledge";
import { isEmail, isIn } from "validator";

/*
NOTE: (alopez) Emails will be called after User, which validates all of this information, but
adding in regardless, as part of the demonstration.
Trusted Input vs Untrusted Input!
*/
class Email {
  public msg = {};

  constructor(
    private readonly toEmail: string,
    private readonly template: string,
  ) {}

  init(): Response | ResponseError {
    try {
      if (
        isEmail(this.toEmail) == false ||
        isIn(this.template, ["acknowledge", "reject", "accept"]) == false
      ) {
        throw new ResponseError(400, "Bad Request");
      }
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  generate(): Response | ResponseError {
    try {
      if (this.template == "reject") {
        // Simplify!
        // abstract better!
        this.msg = reject(this.toEmail);
      } else if (this.template == "acknowledge") {
        this.msg = acknowledge(this.toEmail);
      } else if (this.template == "accept") {
        this.msg = accept(this.toEmail);
      } else {
        throw new ResponseError(400, "Bad Request");
      }
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  /*
  NOTE: (alopez) Migrate email sending to a background task.
  */
  async send(): Promise<Response | ResponseError> {
    try {
      await sgMail.send(this.msg);
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { Email };
