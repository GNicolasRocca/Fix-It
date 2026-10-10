import { NextFunction, Request, Response } from "express";
import { verify_token } from "../utils/jwt";
import { user_get_id_service } from "../handlers/users.service";

const auth_middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

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

    const decoded = verify_token(token);

    const user = await user_get_id_service(decoded.userId);

    if (!user.isActive) {
      res.status(403).json({
        message: "La cuenta se encuentra eliminada"
      });
      return;
    }


    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();

  } catch (err) {
      res.status(401).json({
        message: "Token inválido o expirado",
        error: err instanceof Error ? err.message: "Error desconocido",
      });
    }
};

export {
  auth_middleware
};