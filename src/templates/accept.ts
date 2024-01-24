import { SENDGRID_DOMAIN_EMAIL, COMPANY_NAME } from "../config/environment";

const response = `
Thanks for applying!

I'd love to schedule a time for us to speak.

Below is my Calendly link where you can schedule a call with me.

If you don't see a time that works within your schedule, please email me and I can shuffle on my end!

Looking forward to connecting!
`;

const accept = (name: string) => {
  const msg = {
    to: name, // will need to validate
    from: SENDGRID_DOMAIN_EMAIL,
    subject: `${COMPANY_NAME} - Interview Request`,
    text: response,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>", // replace
  };
  return msg;
};

export { accept };
