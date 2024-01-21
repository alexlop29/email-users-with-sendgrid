class Document {
  constructor(
    private readonly name: string,
    private readonly user: string,
    private readonly contents: string, // replace with multer // will contain file contents
  ) {}
}

export { Document };
