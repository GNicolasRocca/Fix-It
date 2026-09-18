import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import server from "./server";

AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos realizada con éxito");

        server.listen(PORT, () => {
            console.log(`Escuchando en el puerto: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(
            "Error al conectar con la base de datos:", error
        );

        process.exit(1);
    });

// tsc index.ts --- Comando similar a npm run build

// tsc --version