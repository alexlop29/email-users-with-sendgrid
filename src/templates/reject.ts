import { SENDGRID_DOMAIN_EMAIL, COMPANY_NAME } from "../config/environment";
import { email } from "../types/email";

const response = `
Thank you for your interest.
<br><br>
Unfortunately, the hiring team has decided to move forward with other candidates.
<br><br>
We wish you all the best in your career.
`;

const reject = (email: string) => {
  const msg: email = {
    to: email,
    from: SENDGRID_DOMAIN_EMAIL,
    subject: `Thank you for your interest in ${COMPANY_NAME}`,
    html: response,
  };
  return msg;
};

export { reject };
