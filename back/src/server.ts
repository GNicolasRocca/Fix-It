import "reflect-metadata";
import express from "express";
import cors from "cors";
import router from "./routes/index.router";

const server = express();

server.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

server.use(express.json());

server.use((req, res, next) => {
  console.log("Solicitud recibida:", req.method, req.url);
  next();
});

server.use(router);

export default server;