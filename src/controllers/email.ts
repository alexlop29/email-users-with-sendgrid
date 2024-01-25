import { sgMail } from "../config/sendgrid";
import { ResponseError } from "../handler/error";
import { Response } from "../handler/response";
import { reject } from "../templates/reject";
import { accept } from "../templates/accept";
import { acknowledge } from "../templates/acknowledge";
import { isEmail, isIn } from "validator";
import { email } from "../types/email";

/*
NOTE: (alopez) Emails will be called after User, which validates all of this information, but
adding in regardless, as part of the demonstration.
Trusted Input vs Untrusted Input!
*/
class Email {
  public msg: email | undefined;
  private templates: { [key: string]: () => email } = {
    acknowledge: () => acknowledge(this.toEmail),
    reject: () => reject(this.toEmail),
    accept: () => accept(this.toEmail),
  };
  constructor(
    private readonly toEmail: string,
    private readonly template: string,
  ) {}

  init(): Response | ResponseError {
    if (
      isEmail(this.toEmail) &&
      isIn(this.template, ["acknowledge", "reject", "accept"])
    ) {
      return new Response(200, "OK");
    } else {
      throw new ResponseError(400, "Bad Request");
    }
  }

  create(): Response | ResponseError {
    if (this.templates.hasOwnProperty(this.template)) {
      this.msg = this.templates[this.template]();
      return new Response(200, "OK");
    } else {
      throw new ResponseError(400, "Bad Request");
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
