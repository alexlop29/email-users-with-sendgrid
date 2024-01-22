/*
// Thoughts: Can require a unique user email to prevent re-uploads
// What if there is an error? ATOMIC transaction in Mongoose? 
*/
import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { isEmail, isMobilePhone } from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Invalid Email Address"],
  },
  phone: {
    type: String,
    required: true,
    validate: [isMobilePhone, "Invalid Phone Number"],
  },
  resume: {
    type: String, // change to a reference to the document schema
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

export { userSchema };
