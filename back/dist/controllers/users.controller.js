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
exports.user_login_controller = exports.user_register_controller = exports.user_get_id_controller = exports.users_get_controller = void 0;
const users_service_1 = require("../handlers/users.service");
const jwt_1 = require("../utils/jwt");
const user_register_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const new_user = yield (0, users_service_1.user_register_service)(req.body);
        res.status(201).json({
            message: "Usuario creado correctamente",
            data: new_user,
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
        console.log("BODY DE LA REQUEST:", req.body);
        const user_found = yield (0, users_service_1.user_login_service)(req.body);
        const token = (0, jwt_1.generate_token)(user_found.id);
        res.status(200).json({
            login: true,
            user: user_found,
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
        res.status(200).json({
            message: "Obtuvó un usuario por id",
            data: yield (0, users_service_1.user_get_id_service)(parseInt(req.params.id)),
        });
    }
    catch (err) {
        res.status(404).json({
            message: "Error al obtener un usuario por ID, usuario por id no encontrado",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.user_get_id_controller = user_get_id_controller;
