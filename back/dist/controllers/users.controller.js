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
exports.user_delete_controller = exports.user_edit_controller = exports.user_get_id_admin_controller = exports.user_get_id_controller = exports.users_get_controller = exports.user_login_controller = exports.user_register_controller = void 0;
const users_service_1 = require("../handlers/users.service");
const jwt_1 = require("../utils/jwt");
const ConflictException_1 = require("../exceptions/ConflictException");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const user_register_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_user = yield (0, users_service_1.user_register_service)(req.body);
        res.status(201).json({
            message: "Usuario creado correctamente",
            data: {
                id: new_user.id,
                name: new_user.name,
                email: new_user.email,
                birthdate: new_user.birthdate,
                nDni: new_user.nDni,
                role: new_user.role,
                credentialId: new_user.credentials.id,
                username: new_user.credentials.username
            },
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error al crear un usuario",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.user_register_controller = user_register_controller;
const user_login_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_found = yield (0, users_service_1.user_login_service)(req.body);
        const token = (0, jwt_1.generate_token)(user_found.user.id, user_found.user.role);
        res.status(200).json({
            login: true,
            user: {
                id: user_found.id,
                username: user_found.username,
                userId: user_found.user.id,
                name: user_found.user.name,
                email: user_found.user.email,
                birthdate: user_found.user.birthdate,
                nDni: user_found.user.nDni,
                role: user_found.user.role
            },
            token,
        });
    }
    catch (err) {
        res.status(401).json({
            message: "Datos incorrectos",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.user_login_controller = user_login_controller;
const users_get_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            message: "Obtuvó todos los usuarios",
            data: yield (0, users_service_1.users_get_service)(),
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Error al obtener todos los usuarios",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.users_get_controller = users_get_controller;
const user_get_id_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, users_service_1.user_get_id_service)(req.userId);
        res.status(200).json({
            message: "Obtuvó su usuario por su id",
            data: {
                userId: user.id,
                email: user.email,
                name: user.name,
                birthdate: user.birthdate,
                nDni: user.nDni,
                role: user.role,
                createAt: user.createAt,
                updateAt: user.updateAt,
                appointments: user.appointments,
                credentialId: user.credentials.id,
                username: user.credentials.username
            }
        });
    }
    catch (err) {
        res.status(404).json({
            message: "Error al obtener su usuario por su ID, usuario por su ID no encontrado",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.user_get_id_controller = user_get_id_controller;
const user_get_id_admin_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_found = yield (0, users_service_1.user_get_id_admin_service)(req.params.id);
        res.status(200).json({
            message: "Obtuvó un usuario por su id",
            data: {
                userId: user_found.id,
                email: user_found.email,
                birthdate: user_found.birthdate,
                nDni: user_found.nDni,
                role: user_found.role,
                createAt: user_found.createAt,
                updateAt: user_found.updateAt,
                appointments: user_found.appointments,
                credentialId: user_found.credentials.id,
                username: user_found.credentials.username
            }
        });
    }
    catch (err) {
        res.status(404).json({
            message: "Error al obtener un usuario por su ID, usuario por su ID no encontrado",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.user_get_id_admin_controller = user_get_id_admin_controller;
const user_edit_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_edit = yield (0, users_service_1.user_edit_service)(req.userId, req.body);
        res.status(200).json({
            message: "Modificó su usuario",
            data: {
                userId: user_edit.id,
                email: user_edit.email,
                name: user_edit.name,
                birthdate: user_edit.birthdate,
                nDni: user_edit.nDni,
                role: user_edit.role,
                createAt: user_edit.createAt,
                updateAt: user_edit.updateAt,
                appointments: user_edit.appointments,
                credentialId: user_edit.credentials.id,
                username: user_edit.credentials.username
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Error al modificar su usuario",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.user_edit_controller = user_edit_controller;
const user_delete_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.userId;
        yield (0, users_service_1.user_delete_service)(user);
        res.status(200).json({
            message: "Eliminó su usuario",
            data: user
        });
    }
    catch (err) {
        const statusCode = err instanceof ConflictException_1.ConflictException ? 409 :
            err instanceof NotFoundException_1.NotFoundException ? 404 : 500;
        res.status(statusCode).json({
            message: "Error al desactivar su cuenta",
            error: err instanceof Error
                ? err.message
                : "Error desconocido"
        });
    }
});
exports.user_delete_controller = user_delete_controller;
