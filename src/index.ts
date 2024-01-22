import express from "express";
import { EXPRESS_PORT } from "./config/environment.js";
import * as http from "http";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hi Alex!");
});

const server: http.Server = app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on http://localhost:${EXPRESS_PORT}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

export { server };
