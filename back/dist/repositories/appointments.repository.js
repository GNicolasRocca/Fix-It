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
    calendar_appointment_repository: function (date, time, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_appointment = this.create({ date, time, user });
            return yield this.save(new_appointment);
        });
    },
    // Este metodo es temporal hasta que se ubique un metodo mejor
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
    find_appointments_repository: function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find();
        });
    },
    find_appointment_by_id_repository: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: { id }
            });
        });
    },
    find_appointment_by_user_id_repository: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                where: {
                    user: { id }
                },
                order: {
                    date: "ASC",
                    time: "ASC"
                }
            });
        });
    },
    find_appointment_by_id_and_user_repository: function (appointmentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: {
                    id: appointmentId,
                    user: {
                        id: userId
                    }
                }
            });
        });
    },
    cancel_appointment_repository: function (appointment) {
        return __awaiter(this, void 0, void 0, function* () {
            appointment.status = IAppointment_1.Status.cancelled;
            return yield this.save(appointment);
        });
    },
});
