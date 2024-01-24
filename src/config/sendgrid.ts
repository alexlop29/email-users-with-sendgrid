import { SENDGRID_API_KEY } from "./environment";
const sgMail = require("@sendgrid/mail");

/*
NOTE: (alopez) Return and improve the error handling.
*/
try {
  sgMail.setApiKey(SENDGRID_API_KEY);
} catch (error) {
  console.log("Error connecting to SendGrid");
}

export { sgMail };
