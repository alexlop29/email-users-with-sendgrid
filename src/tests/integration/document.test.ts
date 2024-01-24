import { Document } from "../../controllers/document";
import { Readable } from "stream";

describe("Should describe the document", () => {
  let sampleFile: Express.Multer.File = {
    fieldname: "resume",
    originalname: "resume.pdf",
    encoding: "7bit",
    mimetype: "application/pdf",
    destination: "uploads/",
    filename: "resume.pdf",
    path: "uploads/resume.pdf",
    size: 1024,
    buffer: Buffer.from("test"),
    stream: Readable.from(["test"]),
  };

  test("Should return 200 and rename the document", () => {
    const doc = new Document({ ...sampleFile });
    const response = doc.rename();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    expect(doc.name).not.toBe("");
    expect(doc.name).not.toBe(sampleFile.originalname);
  });

  test("Should return 200 and save the document", async () => {
    const doc = new Document({ ...sampleFile });
    doc.rename();
    const response = await doc.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
