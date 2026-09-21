"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_middleware = void 0;
const jwt_1 = require("../utils/jwt");
const auth_middleware = (req, res, next) => {
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
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Token inválido o expirado",
            error: err instanceof Error ? err.message : "Error desconocido",
        });
    }
};
exports.auth_middleware = auth_middleware;
