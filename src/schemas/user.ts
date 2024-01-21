/*
// Thoughts: Can require a unique user email to prevent re-uploads
// What if there is an error? ATOMIC transaction in Mongoose? 
*/
import mongoose from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  secondName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // change to a reference to the document schema
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

export { userSchema };
