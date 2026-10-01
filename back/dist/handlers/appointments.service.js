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
const BadRequestException_1 = require("../exceptions/BadRequestException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const ConflictException_1 = require("../exceptions/ConflictException");
const IAppointment_1 = require("../interfaces/IAppointment");
const calendar_appointment = (app, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user_found = yield (0, users_service_1.user_get_id_service)(userId);
    if (!user_found) {
        throw new BadRequestException_1.BadRequestException(`El usuario con id ${userId} no existe.`);
    }
    yield validate_appointment(app.date, app.time);
    const active_appointments = yield appointments_repository_1.AppointmentsRepository.count_active_appointments_by_user(userId);
    if (active_appointments >= 5) {
        throw new BadRequestException_1.BadRequestException("Alcanzaste el límite máximo de 5 turnos activos. Para solicitar otro turno, primero debés cancelar uno.");
    }
    // ---------------------------------------------------------------
    const new_appointment = yield appointments_repository_1.AppointmentsRepository.calendar_appointment_repository(app.date, app.time, user_found);
    return new_appointment;
});
exports.calendar_appointment = calendar_appointment;
const get_appointments_service = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield appointments_repository_1.AppointmentsRepository.find_appointments_repository();
});
exports.get_appointments_service = get_appointments_service;
const get_appointment_id_service = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment_found = yield appointments_repository_1.AppointmentsRepository.find_appointment_by_id_repository(id);
    if (!appointment_found)
        throw new NotFoundException_1.NotFoundException(`El turno con ${id} no fue encontrado`);
    return appointment_found;
});
exports.get_appointment_id_service = get_appointment_id_service;
const get_appointments_by_user_service = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield appointments_repository_1.AppointmentsRepository.find_appointment_by_user_id_repository(userId);
});
exports.get_appointments_by_user_service = get_appointments_by_user_service;
const appointment_cancelled = (appointmentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment_found = yield appointments_repository_1.AppointmentsRepository.find_appointment_by_id_and_user_repository(appointmentId, userId);
    if (!appointment_found) {
        throw new NotFoundException_1.NotFoundException(`El turno con id ${appointmentId} no fue encontrado.`);
    }
    if (appointment_found.status === IAppointment_1.Status.cancelled) {
        throw new ConflictException_1.ConflictException(`El turno con id ${appointmentId} ya se encuentra cancelado.`);
    }
    const cancelled_appointment = yield appointments_repository_1.AppointmentsRepository.cancel_appointment_repository(appointment_found);
    return cancelled_appointment;
});
exports.appointment_cancelled = appointment_cancelled;
const validate_appointment = (date, time) => __awaiter(void 0, void 0, void 0, function* () {
    const appointment_taken = yield appointments_repository_1.AppointmentsRepository.find_active_appointment_repository(date, time);
    if (appointment_taken) {
        throw new ConflictException_1.ConflictException("Ya existe un turno reservado en ese horario");
    }
    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);
    const app_date = new Date(year, month - 1, day, hours, minutes, 0, 0);
    const today = new Date();
    if (app_date < today) {
        throw new BadRequestException_1.BadRequestException("No se pueden agendar turnos en fechas pasadas a la actual.");
    }
    const day_week = app_date.getDay();
    if (day_week === 0 || day_week === 6) {
        throw new BadRequestException_1.BadRequestException("No se pueden agendar turnos los fines de semana.");
    }
    if (hours < 8 || hours >= 18) {
        throw new BadRequestException_1.BadRequestException("No se pueden agendar turnos fuera de horario, de 8 am a 18 pm.");
    }
    if (minutes !== 0) {
        throw new BadRequestException_1.BadRequestException("Los turnos deben comenzar en una hora exacta.");
    }
});
