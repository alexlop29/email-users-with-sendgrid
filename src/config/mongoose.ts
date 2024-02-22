import { MONGO_DB_URI } from "./environment";
const mongoose = require("mongoose");
import { app } from "../index.js";
import { ResponseError } from "../handler/error";

try {
  mongoose.connect(MONGO_DB_URI, {
    maxPoolSize: 10,
    minPoolSize: 5,
  });
  mongoose.connection.once("open", () => {
    app.emit("ready");
  });
} catch (error) {
  throw new ResponseError(500, "Internal Server Error");
}

export { mongoose };
