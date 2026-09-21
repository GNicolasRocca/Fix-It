"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("reflect-metadata");
const data_source_1 = require("./config/data-source");
const envs_1 = require("./config/envs");
const server_1 = __importDefault(require("./server"));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Conexión a la base de datos realizada con éxito");
    server_1.default.listen(envs_1.PORT, () => {
        console.log(`Escuchando en el puerto: ${envs_1.PORT}`);
    });
})
    .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
});
// tsc index.ts --- Comando similar a npm run build
// tsc --version
