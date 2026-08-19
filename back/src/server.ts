import "reflect-metadata";
import express from "express";
import cors from "cors";
import router from "../src/routes/index_router";

const server = express();

server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

server.use(express.json()); // esto va primero que el server.use(router);
server.use((req, res, next) => {
  console.log("Solicitud recibida:", req.method, req.url);
  next();
});
server.use(router);


// debo despues import los middleware para que funcione el front, en la clase que los conectemos lo vamos a hacer

export default server;