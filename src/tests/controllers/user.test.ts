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

  test("Should return 400 if the user's information is invalid", async () => {
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
  // test("Should return 400 if unable to validate the user's information", () => {
  //   //
  // });
  // test("Should return 500 if an unexpected error occurs while saving the user's information", () => {
  //   //
  // });
});
