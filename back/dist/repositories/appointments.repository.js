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
exports.AppointmentsRepository = void 0;
const data_source_1 = require("../config/data-source");
const Appointments_entity_1 = require("../entities/Appointments.entity");
const IAppointment_1 = require("../interfaces/IAppointment");
exports.AppointmentsRepository = data_source_1.AppDataSource
    .getRepository(Appointments_entity_1.Appointment)
    .extend({
    validate_appointments: function (date, time) {
        const [year, month, day] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const app_date = new Date(year, month - 1, day, hours, minutes, 0, 0);
        const today = new Date();
        console.log("========== VALIDACIÓN TURNO ==========");
        console.log("Fecha recibida:", date);
        console.log("Hora recibida:", time);
        console.log("Fecha del turno:", app_date);
        console.log("Fecha actual:", today);
        console.log("¿Es pasado?:", app_date < today);
        console.log("======================================");
        if (app_date < today) {
            throw new Error("No se pueden agendar turnos en fechas pasadas");
        }
        const day_week = app_date.getDay();
        if (day_week === 0 || day_week === 6) {
            throw new Error("No se pueden agendar turnos los fines de semana");
        }
        if (hours < 8 || hours >= 18) {
            throw new Error("No se pueden agendar turnos fuera de horario, de 8 am a 18 pm");
        }
    }, // Este metodo es temporal hasta que se ubique un metodo mejor
    count_active_appointments_by_user: function (userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.count({
                where: {
                    user: {
                        id: userId
                    },
                    status: IAppointment_1.Status.active
                }
            });
        });
    },
});
