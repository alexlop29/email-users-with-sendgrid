import { SENDGRID_DOMAIN_EMAIL, COMPANY_NAME } from "../config/environment";

const response = `
Thank you for your interest.

Unfortunately, the hiring team has decided to move forward with other candidates.

We wish you all the best in your career.
`;

const reject = (name: string) => {
  const msg = {
    to: name, // will need to validate
    from: SENDGRID_DOMAIN_EMAIL,
    subject: `Thank you for your intest in ${COMPANY_NAME}`,
    text: response,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>", // replace
  };
  return msg;
};

export { reject };
