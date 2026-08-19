import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import server from "./server";

// import router from "./routes/index_router";

AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a la base de datos realizada con éxito");
        server.listen(PORT, () => {
            console.log(`Escuchando en el puerto: ${PORT}`);
        })
    })

//server.use(router);

// tsc index.ts --- Comando similar a npm run build

// Fijarse si cuando guardo el codigo se actualiza el index.js (creo que si)

// tsc --version

// firmar una funcion se refiere el poner el tipo de dato que vamos a estar trabajando, eje: numero: number