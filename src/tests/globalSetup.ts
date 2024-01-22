import { mongoose } from "../config/mongoose";

module.exports = async function (_globalConfig: any, _projectConfig: any) {
  await mongoose.connection.dropCollection("users");
};
