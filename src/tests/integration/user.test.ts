import { User } from "../../controllers/user";
import { ResponseError } from "../../handler/error";
import { Response } from "../../handler/response";
import { storedUser } from "../utils/storedUser";
import { initalize } from "./setup";

describe("Should describe the user", () => {
  let validUser = {
    firstName: "John",
    lastName: "Tucker",
    email: "johntucker@gmail.com",
    phone: "9172009082",
    resume: "resume.pdf",
  };

  beforeAll(async () => {
    await initalize();
  });

  test("Should return 200 if the user's information is valid", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      validUser.email,
      validUser.phone,
      validUser.resume,
    );
    expect(await user.validate()).toEqual(new Response(200, "OK"));
  });

  test("Should return 400 if the user's first name is an empty string", async () => {
    const user = new User(
      "",
      validUser.lastName,
      validUser.email,
      validUser.phone,
      validUser.resume,
    );

    expect(async() => await user.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the user's last name is an empty string", async () => {
    const user = new User(
      validUser.firstName,
      "",
      validUser.email,
      validUser.phone,
      validUser.resume,
    );

    expect(async() => await user.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the user provides an invalid email address", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      "sdasd@fsc",
      validUser.phone,
      validUser.resume,
    );

    expect(async() => await user.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the user provides an empty email address", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      "",
      validUser.phone,
      validUser.resume,
    );

    expect(async() => await user.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the user provides an empty phone number", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      validUser.email,
      "",
      validUser.resume,
    );

    expect(async() => await user.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the user provides an invalid phone number", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      validUser.email,
      "2311231",
      validUser.resume,
    );

    expect(async() => await user.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  // Add test to validate the document object id!

  test("Should return 200 and save the user's information", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      validUser.email,
      validUser.phone,
      validUser.resume,
    );

    expect(await user.save()).toEqual(new Response(200, "OK"));
  });

  test("Should return 400 if the email address is already in use", async() => {
    const user = new User(
      storedUser.firstName,
      storedUser.lastName,
      storedUser.email,
      storedUser.phone,
      storedUser.resume,
    );

    expect(async() => await user.save()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });
}); 
