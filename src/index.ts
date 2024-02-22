import express from "express";
import { EXPRESS_PORT } from "./config/environment.js";
import * as http from "http";
import { mongoose } from "./config/mongoose.js";

const app = express();

let server: http.Server;

mongoose.connection.once();

app.on("ready", () => {
  server = app.listen(EXPRESS_PORT, () => {
    console.log(`Server is running on http://localhost:${EXPRESS_PORT}`);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

export { server, app };
