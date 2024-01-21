import { User } from "../../controllers/user";
import { user } from "../../models/user";
import { stub } from "sinon";

const mockSave = stub(user, "save");
mockSave.returns({
  _id: "123456789012345678901234",
  firstName: "John",
  lastName: "Tucker",
  email: "johntucker@gmail.com",
  phone: "9172009082",
  resume: "resume.pdf",
});

describe("Should describe the user", () => {
  test("Should return 200 and save the user's information", async () => {
    const user = new User(
      "John",
      "Tucker",
      "johntucker@gmail.com",
      "9172009082",
      "resume.pdf",
    );
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
