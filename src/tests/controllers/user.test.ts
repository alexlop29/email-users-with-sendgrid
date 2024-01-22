import { User } from "../../controllers/user";
import { ResponseError } from "../../handler/error";
import { user } from "../../models/user";
import { stub, SinonStub } from "sinon";

describe("Should describe the user", () => {
  let mockSave: SinonStub;
  let mockValidate: SinonStub;
  let validUser = {
    firstName: "John",
    lastName: "Tucker",
    email: "johntucker@gmail.com",
    phone: "9172009082",
    resume: "resume.pdf",
  };

  beforeEach(() => {
    mockSave = stub(user.prototype, "save");
    mockValidate = stub(user.prototype, "validate");
  });

  afterEach(() => {
    mockSave.restore();
    mockValidate.restore();
  });

  test("Should return 200 if the user's information is valid", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      validUser.email,
      validUser.phone,
      validUser.resume,
    );

    mockValidate.resolves(validUser);
    const response = await user.validate();

    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the user's first name is an empty string", async () => {
    const user = new User(
      "",
      validUser.lastName,
      validUser.email,
      validUser.phone,
      validUser.resume,
    );

    mockValidate.rejects();

    expect(() => user.validate()).rejects.toThrow(
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

    mockValidate.rejects();

    expect(() => user.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the user provides an empty email address", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      "sdasd@fsc",
      validUser.phone,
      validUser.resume,
    );

    mockValidate.rejects();

    expect(() => user.validate()).rejects.toThrow(
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

    mockSave.resolves(validUser);
    const response = await user.save();

    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 500 if unable to save the user's information", async () => {
    const user = new User(
      validUser.firstName,
      validUser.lastName,
      validUser.email,
      validUser.phone,
      validUser.resume,
    );

    mockSave.rejects();

    expect(() => user.save()).rejects.toThrow(
      new ResponseError(500, "Internal Server Error"),
    );
  });
});
