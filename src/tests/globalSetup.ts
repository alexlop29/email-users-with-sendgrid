import { mongoose } from "../config/mongoose";
import { user } from "../models/user";
import { storedUser } from "./utils/storedUser";

module.exports = async function (_globalConfig: any, _projectConfig: any) {
  await mongoose.connection.dropCollection("users");
  const profile = new user(storedUser);
  await profile.save();
};
