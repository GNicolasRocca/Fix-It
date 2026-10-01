"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
const users_entity_1 = require("../entities/users.entity");
const appointments_entity_1 = require("../entities/appointments.entity");
const credentials_entity_1 = require("../entities/credentials.entity");
exports.AppDataSource = new typeorm_1.DataSource({
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
        users_entity_1.Users,
        credentials_entity_1.Credentials,
        appointments_entity_1.Appointments
    ],
    subscribers: [],
    migrations: [],
});
