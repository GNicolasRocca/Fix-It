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
exports.appointment_edit_controller = exports.appointment_create_controller = exports.appointments_get_by_user_controller = exports.appointments_get_id_controller = exports.appointments_get_controller = void 0;
const appointments_service_1 = require("../handlers/appointments.service");
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
    const appointment_id = yield (0, appointments_service_1.get_appointment_id_service)(parseInt(req.params.id));
    try {
        res.status(200).json({
            message: "Obtuvó un turno por ID",
            data: appointment_id
        });
    }
    catch (err) {
        res.status(404).json({
            message: "Error obtener un turno por ID, turno no encontrado",
            error: err instanceof Error ? err.message : "Error desconocido"
        });
    }
});
exports.appointments_get_id_controller = appointments_get_id_controller;
const appointments_get_by_user_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
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
const appointment_create_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({
                message: "Usuario no autenticado"
            });
            return;
        }
        const new_appointment = yield (0, appointments_service_1.calendar_appointment)(req.body, req.userId);
        res.status(201).json({
            message: "Creó un nuevo turno",
            data: new_appointment
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error al crear un nuevo turno, datos incorrectos",
            error: err instanceof Error ? err.message : "Error desconocido"
        });
    }
});
exports.appointment_create_controller = appointment_create_controller;
const appointment_edit_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cancelled = yield (0, appointments_service_1.appointment_cancelled)(parseInt(req.params.id));
        res.status(200).json({
            message: "Canceló un turno",
            data: cancelled
        });
    }
    catch (err) {
        res.status(404).json({
            message: "Error al cancelar un turno, turno no encontrado",
            error: err instanceof Error ? err.message : "Error desconocido"
        });
    }
});
exports.appointment_edit_controller = appointment_edit_controller;
// hacer validaciones de todo
