import { DataSource } from "typeorm";
import "dotenv/config";
import { User } from "../entities/User.entity";
import { Appointment } from "../entities/Appointments.entity";
import { Credential } from "../entities/Credentials.entity";

export const AppDataSource = new DataSource({
    type: "postgres",

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3000,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    dropSchema: process.env.DB_DROP_SCHEMA === "false",
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "false",

    entities: [
        User,
        Credential,
        Appointment
    ],
    subscribers: [],
    migrations: [],
});

// el null va en caso de que no exista lo que ponemos (id por ejemplo) 16:30