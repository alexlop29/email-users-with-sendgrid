import { MONGO_DB_URI } from "./environment";
const mongoose = require("mongoose");

// Return and update the error handling.
// ensure graceful shutdown!
try {
  console.log(MONGO_DB_URI); // debug step
  mongoose.connect(MONGO_DB_URI, {
    maxPoolSize: 10,
    minPoolSize: 5,
  });
} catch (error) {
  console.log("Error connecting to MongoDB Atlas");
}

export { mongoose };
