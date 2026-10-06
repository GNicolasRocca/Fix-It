"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role_middleware = void 0;
const role_middleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.userRole) {
            res.status(401).json({
                error: "Unauthorized",
                message: "Usuario no autenticado"
            });
            return;
        }
        if (!allowedRoles.includes(req.userRole)) {
            res.status(403).json({
                error: "Forbidden",
                message: "No tenés permisos para realizar esta acción"
            });
            return;
        }
        next();
    };
};
exports.role_middleware = role_middleware;
