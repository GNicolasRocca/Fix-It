import { DataSource } from "typeorm";
import "dotenv/config";
import { Users } from "../entities/users.entity";
import { Appointments } from "../entities/appointments.entity";
import { Credentials } from "../entities/credentials.entity";

export const AppDataSource = new DataSource({
    type: "postgres",

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    dropSchema: process.env.DB_DROP_SCHEMA === "true",
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",

    entities: [
        Users,
        Credentials,
        Appointments
    ],
    subscribers: [],
    migrations: [],
});