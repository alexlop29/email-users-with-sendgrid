import { SENDGRID_DOMAIN_EMAIL, COMPANY_NAME } from "../config/environment";
import { email } from "../types/email";

const response = `
Beep, boop, bop! This is our friendly bot confirming we received your application. 

Thanks for applying! 

Rest assured that we will respond within 7 days.

Talk soon!
`;

const acknowledge = (name: string) => {
  const msg: email = {
    to: name, // will need to validate
    from: SENDGRID_DOMAIN_EMAIL,
    subject: `Thank you for applying to ${COMPANY_NAME}`,
    text: response,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>", // replace
  };
  return msg;
};

export { acknowledge };
