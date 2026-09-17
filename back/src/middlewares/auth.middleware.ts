import { NextFunction, Request, Response } from "express";
import { verify_token } from "../utils/jwt";

const auth_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

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

    req.userId = decoded.userId;

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