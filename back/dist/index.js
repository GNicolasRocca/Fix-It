"use strict";
//import express from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
server_1.default.listen(envs_1.PORT, () => {
    console.log(`Escuchando en el puerto: ${envs_1.PORT}`);
});
// tsc index.ts --- Comando similar a npm run build
// Fijarse si cuando guardo el codigo se actualiza el index.js (creo que si)
// tsc --version
// no me deja en el start del package.json poner nodemon asecas -- "node ./dist/index.js"
// firmar una funcion se refiere el poner el tipo de dato que vamos a estar trabajando, eje: numero: number
