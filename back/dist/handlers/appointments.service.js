"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointment_cancelled = exports.calendar_appointment = exports.get_appointments_by_user_service = exports.get_appointment_id_service = exports.get_appointments_service = void 0;
const users_service_1 = require("./users.service");
const appointments_repository_1 = require("../repositories/appointments.repository");
const IAppointment_1 = require("../interfaces/IAppointment");
const get_appointments_service = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield appointments_repository_1.AppointmentsRepository.find();
    if (appointments.length === 0)
        throw Error(`No hay turnos en la base de datos`);
    return appointments;
});
exports.get_appointments_service = get_appointments_service;
const get_appointment_id_service = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment_found = yield appointments_repository_1.AppointmentsRepository.findOne({
        where: {
            id: id
        }
    });
    if (!appointment_found)
        throw Error(`El turno no ${id} fue encontrado`);
    return appointment_found;
});
exports.get_appointment_id_service = get_appointment_id_service;
const get_appointments_by_user_service = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield appointments_repository_1.AppointmentsRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        order: {
            date: "ASC",
            time: "ASC"
        }
    });
    return appointments;
});
exports.get_appointments_by_user_service = get_appointments_by_user_service;
const calendar_appointment = (app, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Esto es temporal hasta que implemente alguna whitelist
    const active_appointments = yield appointments_repository_1.AppointmentsRepository.count_active_appointments_by_user(userId);
    console.log("========== LÍMITE DE TURNOS ==========");
    console.log("Usuario:", userId);
    console.log("Turnos activos encontrados:", active_appointments);
    console.log("======================================");
    if (active_appointments >= 5) {
        throw new Error("Alcanzaste el límite máximo de 5 turnos activos. Para solicitar otro turno, primero debés cancelar uno.");
    }
    appointments_repository_1.AppointmentsRepository.validate_appointments(app.date, app.time);
    const user_found = yield (0, users_service_1.user_get_id_service)(userId);
    if (!user_found) {
        throw new Error(`Usuario con id ${userId} no encontrado`);
    }
    const new_appointment = appointments_repository_1.AppointmentsRepository.create({
        date: app.date,
        time: app.time,
        user: user_found
    });
    yield appointments_repository_1.AppointmentsRepository.save(new_appointment);
    return new_appointment;
});
exports.calendar_appointment = calendar_appointment;
const appointment_cancelled = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment_found = yield appointments_repository_1.AppointmentsRepository.findOneBy({ id }); // si no usar findOne asecas
    if (!appointment_found)
        throw Error(`El turno ${id} no fue encontrado`);
    appointment_found.status = IAppointment_1.Status.cancelled;
    yield appointments_repository_1.AppointmentsRepository.save(appointment_found);
    return appointment_found;
});
exports.appointment_cancelled = appointment_cancelled;
