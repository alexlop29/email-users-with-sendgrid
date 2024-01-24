import { Document } from "../../controllers/document";
// import { ResponseError } from "../../handler/error";
import { s3 } from "../../config/s3";
import { stub, SinonStub } from "sinon";
import { Readable } from "stream";
const crypto = require('crypto');

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

  // Having issues stubbing the crypto module properly!
  test("Should return 500 if unable to rename the document", async () => {
    const doc = new Document({ ...sampleFile });
  
    let mockRandomUUID: SinonStub;
    mockRandomUUID = stub(crypto, "randomUUID");
    mockRandomUUID.rejects();

    const response = doc.rename();
    expect(response.status).toBe(500);
    expect(response.message).toBe("Internal Server Error");
  });
});
