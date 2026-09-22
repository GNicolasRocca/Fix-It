"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
const User_entity_1 = require("../entities/User.entity");
const Appointments_entity_1 = require("../entities/Appointments.entity");
const Credentials_entity_1 = require("../entities/Credentials.entity");
exports.AppDataSource = new typeorm_1.DataSource({
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
        User_entity_1.User,
        Credentials_entity_1.Credential,
        Appointments_entity_1.Appointment
    ],
    subscribers: [],
    migrations: [],
});
// el null va en caso de que no exista lo que ponemos (id por ejemplo) 16:30
