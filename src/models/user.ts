import { userSchema } from "../schemas/user";
import { mongoose } from "../config/mongoose";

const user = mongoose.model("user", userSchema);

export { user };
