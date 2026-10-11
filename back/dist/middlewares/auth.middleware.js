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
exports.auth_middleware = void 0;
const jwt_1 = require("../utils/jwt");
const users_service_1 = require("../handlers/users.service");
const auth_middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({
                message: "Token de autenticación requerido"
            });
            return;
        }
        const [type, token] = authorization.split(" ");
        if (type !== "Bearer" || !token) {
            res.status(401).json({
                message: "Formato de token inválido"
            });
            return;
        }
        const decoded = (0, jwt_1.verify_token)(token);
        const user = yield (0, users_service_1.user_get_id_service)(decoded.userId);
        if (!user.isActive) {
            res.status(403).json({
                message: "La cuenta se encuentra eliminada"
            });
            return;
        }
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Token inválido o expirado",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
});
exports.auth_middleware = auth_middleware;
