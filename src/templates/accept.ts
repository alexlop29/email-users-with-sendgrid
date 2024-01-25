import { SENDGRID_DOMAIN_EMAIL, COMPANY_NAME } from "../config/environment";
import { email } from "../types/email";

const response = `
Thanks for applying!
<br><br>
I'd love to schedule a time for us to speak.
<br><br>
Below is my Calendly link where you can schedule a call with me.
<br><br>
If you don't see a time that works within your schedule, please email me and I can shuffle on my end!
<br><br>
Looking forward to connecting!
`;

const accept = (email: string) => {
  const msg: email = {
    to: email,
    from: SENDGRID_DOMAIN_EMAIL,
    subject: `${COMPANY_NAME} - Interview Request`,
    html: response,
  };
  return msg;
};

export { accept };
