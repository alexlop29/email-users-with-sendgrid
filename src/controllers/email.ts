class Email {
  constructor(
    private readonly toEmail: string,
    private readonly subject: string,
    private readonly message: string,
  ) {}

  send() {
    // send email
  }
}

export { Email };
