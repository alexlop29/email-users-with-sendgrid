import { User } from "../../controllers/user";
import { user } from "../../models/user";
import { stub, SinonStub } from "sinon";

describe("Should describe the user", () => {
  let mockSave: SinonStub;

  beforeEach(() => {
    mockSave = stub(user.prototype, "save");
  });

  afterEach(() => {
    mockSave.restore();
  });

  test("Should return 200 and save the user's information", async () => {
    const userProfile = {
      firstName: "John",
      lastName: "Tucker",
      email: "johntucker@gmail.com",
      phone: "9172009082",
      resume: "resume.pdf",
    };
    const user = new User(
      userProfile.firstName,
      userProfile.lastName,
      userProfile.email,
      userProfile.phone,
      userProfile.resume,
    );

    mockSave.resolves(userProfile);
    const response = await user.save();

    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
  test("Should return 400 if unable to validate the user's information", () => {
    //
  });
  test("Should return 500 if an unexpected error occurs while saving the user's information", () => {
    //
  });
});
