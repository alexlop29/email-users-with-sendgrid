import { mongoose } from "../../config/mongoose";
import { user } from "../../models/user";
import { storedUser } from "../utils/storedUser";

const initalize = async () => {
  await mongoose.connection.dropCollection("users");
  const profile = new user(storedUser);
  await profile.save();
};

export { initalize };
