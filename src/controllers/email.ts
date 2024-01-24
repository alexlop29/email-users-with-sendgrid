import { sgMail } from "../config/sendgrid";
import { ResponseError } from "../handler/error";
import { Response } from "../handler/response";
import { SENDGRID_DOMAIN_EMAIL } from "../config/environment";
import { reject } from "../templates/reject";
import { accept } from "../templates/accept";
import { acknowledge } from "../templates/acknowledge";

class Email {
  public msg = {};

  constructor(
    private readonly userEmail: string, // use valdiator!
    private readonly userFirstName: string,
    private readonly subject: string, // may want to create template for rejection, acknowledge, and lets chat(?) use validator
  ) {}

  init(): Response | ResponseError {
    try {
      if (this.subject == "reject") {
        // abstract better!
        this.msg = reject(this.userFirstName);
      } else if (this.subject == "acknowledge") {
        this.msg = acknowledge(this.userFirstName);
      } else if (this.subject == "accept") {
        this.msg = accept(this.userFirstName);
      } else {
        throw new ResponseError(400, "Bad Request");
      }
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  // can consolidate both of these functions with templates!
  async acknowledge(): Promise<Response | ResponseError> {
    try {
      await sgMail.send();
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  async respond(): Promise<Response | ResponseError> {
    try {
      await sgMail.send(); // will need follow up with times /
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  // add validation to ensure that the propertyies are correct
  // received from user class (trusted input), but still important to valid!
  // move email sending to a background async task!
}

export { Email };
