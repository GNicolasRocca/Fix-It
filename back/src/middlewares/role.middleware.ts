import { Request, Response, NextFunction } from "express";
import { Role } from "../interfaces/IRole";

export const role_middleware = (...allowedRoles: Role[]) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

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