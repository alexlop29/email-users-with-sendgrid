import { Document } from "../../controllers/document";
import { s3 } from "../../config/s3";
import { stub, SinonStub } from "sinon";
import { Readable } from "stream";
import { ResponseError } from "../../handler/error";

describe("Should describe the document", () => {
  let mockUpload: SinonStub;
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

  beforeEach(() => {
    mockUpload = stub(s3, "upload");
  });

  afterEach(() => {
    mockUpload.restore();
  });

  test("Should return 200 and rename the document", () => {
    const doc = new Document({ ...sampleFile });
    const response = doc.rename();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    expect(doc.name).not.toBe("");
    expect(doc.name).not.toBe(sampleFile.originalname);
  });

  /*
  NOTE: (alopez) Reminder to create unit test for rename() failure path.
  */

  test("Should return 200 and save the document", async () => {
    const doc = new Document({ ...sampleFile });
    doc.rename();

    mockUpload.resolves();
    const response = await doc.save();

    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 500 if the document fails to save", async () => {
    const doc = new Document({ ...sampleFile });
    doc.rename();

    mockUpload.rejects();

    expect(doc.save()).rejects.toThrow(
      new ResponseError(500, "Internal Server Error"),
    );
  });
});
