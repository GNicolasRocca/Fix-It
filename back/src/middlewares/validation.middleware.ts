import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { ClassConstructor, plainToInstance } from "class-transformer";

export const validation_middleware = (DtoClass: ClassConstructor<object>) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const dtoObject = plainToInstance(DtoClass, req.body);

        const errors = await validate(dtoObject);

        if (errors.length > 0) {
            const messages = errors.flatMap((error) =>
                error.constraints
                    ? Object.values(error.constraints)
                    : []
            );

            res.status(400).json({
                error: "BadRequestException",
                message: "Los datos enviados no son válidos",
                details: messages
            });

            return;
        }

        next();
    };
};