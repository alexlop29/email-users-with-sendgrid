import { SENDGRID_DOMAIN_EMAIL, COMPANY_NAME } from "../config/environment";
import { email } from "../types/email";

const response = `
Beep, boop, bop! This is our friendly bot confirming we received your application. 
<br><br>
Thanks for applying! 
<br><br>
Rest assured that we will respond within 7 days.
<br><br>
Talk soon!
`;

const acknowledge = (email: string) => {
  const msg: email = {
    to: email,
    from: SENDGRID_DOMAIN_EMAIL,
    subject: `Thank you for applying to ${COMPANY_NAME}`,
    html: response,
  };
  return msg;
};

export { acknowledge };
