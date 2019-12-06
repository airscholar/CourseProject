import dotenv from "dotenv";
dotenv.config();
import { app } from "./app";
import env from "./config/env.config";
import http from "http";

const PORT = env.PORT;

const start = async () => {
  const server = http.createServer(app);
  await server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();
