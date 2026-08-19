import { DataSource } from "typeorm";
import dotenv from "dotenv";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dropSchema: process.env.DB_DROP_SCHEMA === "true",
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
    entities: ["src/entities/**/*.ts"],
    subscribers: [],
    migrations: [],
});

// el null va en caso de que no exista lo que ponemos (id por ejemplo) 16:30