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
exports.appointment_cancel_controller = exports.appointment_create_controller = exports.appointments_get_by_user_controller = exports.appointments_get_id_controller = exports.appointments_get_controller = void 0;
const appointments_service_1 = require("../handlers/appointments.service");
const BadRequestException_1 = require("../exceptions/BadRequestException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const ConflictException_1 = require("../exceptions/ConflictException");
const appointment_create_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_appointment = yield (0, appointments_service_1.calendar_appointment)(req.body, req.userId);
        res.status(201).json({
            message: "Creó un nuevo turno",
            data: new_appointment
        });
    }
    catch (err) {
        if (err instanceof BadRequestException_1.BadRequestException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
        if (err instanceof ConflictException_1.ConflictException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
        res.status(500).json({
            error: "InternalServerError",
            message: "Ocurrió un error interno al crear el turno."
        });
    }
});
exports.appointment_create_controller = appointment_create_controller;
const appointments_get_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield (0, appointments_service_1.get_appointments_service)();
    try {
        res.status(200).json({
            message: "Obtuvo todos los turnos",
            data: appointments
        });
    }
    catch (err) {
        res.status(404).json({
            message: "Error al obtener todos los usuarios",
            error: err instanceof Error ? err.message : "Error desconocido"
        });
    }
});
exports.appointments_get_controller = appointments_get_controller;
const appointments_get_id_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield (0, appointments_service_1.get_appointment_id_service)(req.body.id);
        res.status(200).json({
            message: "Obtuvo un turno por ID",
            data: appointment
        });
    }
    catch (err) {
        if (err instanceof BadRequestException_1.BadRequestException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
        if (err instanceof NotFoundException_1.NotFoundException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
        res.status(500).json({
            error: "InternalServerError",
            message: "Ocurrió un error interno al obtener el turno."
        });
    }
});
exports.appointments_get_id_controller = appointments_get_id_controller;
const appointments_get_by_user_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield (0, appointments_service_1.get_appointments_by_user_service)(req.userId);
        res.status(200).json({
            message: "Obtuvo los turnos del usuario",
            data: appointments
        });
    }
    catch (err) {
        res.status(404).json({
            message: "Error al obtener los turnos del usuario",
            error: err instanceof Error
                ? err.message
                : "Error desconocido"
        });
    }
});
exports.appointments_get_by_user_controller = appointments_get_by_user_controller;
const appointment_cancel_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancelled = yield (0, appointments_service_1.appointment_cancelled)(req.params.id, req.userId);
        res.status(200).json({
            message: "Canceló el turno correctamente",
            data: cancelled
        });
    }
    catch (err) {
        if (err instanceof BadRequestException_1.BadRequestException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
        if (err instanceof NotFoundException_1.NotFoundException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
        if (err instanceof ConflictException_1.ConflictException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
    }
});
exports.appointment_cancel_controller = appointment_cancel_controller;
