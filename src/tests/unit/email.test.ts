import { Email } from "../../controllers/email";
import { ResponseError } from "../../handler/error";

describe("Should describe an email", () => {
  const applicant = {
    email: "harrypotter@gmail.com",
    template: "acknowledge",
  };

  test("Should return 200 if the email contains valid parameters", () => {
    const email = new Email(applicant.email, applicant.template);
    const response = email.init();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the email contains invalid parameters", () => {
    let email = new Email(applicant.email, "");
    expect(() => email.init()).toThrow(new ResponseError(400, "Bad Request"));

    email = new Email("", applicant.template);
    expect(() => email.init()).toThrow(new ResponseError(400, "Bad Request"));
  });

  test("Should return 200 and create the email message", () => {
    let email = new Email(applicant.email, "acknowledge");
    email.create();
    expect(email.msg?.to).toBe(applicant.email);
    expect(email.msg?.subject).toEqual(
      expect.stringContaining(`Thank you for applying to`),
    );

    email = new Email(applicant.email, "reject");
    email.create();
    expect(email.msg?.to).toBe(applicant.email);
    expect(email.msg?.subject).toEqual(
      expect.stringContaining(`Thank you for your interest in`),
    );

    email = new Email(applicant.email, "accept");
    email.create();
    expect(email.msg?.to).toBe(applicant.email);
    expect(email.msg?.subject).toEqual(
      expect.stringContaining(`Interview Request`),
    );
  });

  // good test / caught improper error handling in the create class
  test("Should return 500 if unable to create the email message", () => {
    let email = new Email(applicant.email, "");
    expect(() => email.create()).toThrow(
      new ResponseError(500, "Internal Server Error"),
    );
  });
});
