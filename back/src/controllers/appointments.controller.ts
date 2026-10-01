import { Request, Response } from "express";
import { get_appointments_service, get_appointment_id_service, get_appointments_by_user_service, calendar_appointment, appointment_cancelled } from "../handlers/appointments.service";
import { calendar_appointment_dto } from "../dtos/appointments.dto";
import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { ConflictException } from "../exceptions/ConflictException";

const appointment_create_controller = async (req: Request<unknown, unknown, calendar_appointment_dto>, res: Response) => {
    try {
        const new_appointment = await calendar_appointment(req.body, req.userId!);

        res.status(201).json({
           message: "Creó un nuevo turno",
           data: new_appointment
        });
    }
    catch (err) {
        if (err instanceof BadRequestException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });

            return;
        }

        if (err instanceof ConflictException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });

            return;
        }

        res.status(500).json({
            error: "InternalServerError",
            message: "Ocurrió un error interno al crear el turno."
        });
    }
}

const appointments_get_controller = async (req: Request, res: Response) => {
    const appointments = await get_appointments_service();

    try{
        res.status(200).json({
            message: "Obtuvo todos los turnos",
            data: appointments
        });    
    } catch(err){
        res.status(404).json({
            message: "Error al obtener todos los usuarios", 
            error: err instanceof Error ? err.message: "Error desconocido"
        })
    }
}

const appointments_get_id_controller = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        
        const appointment =
            await get_appointment_id_service(req.body.id);

        res.status(200).json({
            message: "Obtuvo un turno por ID",
            data: appointment
        });

    } catch (err) {

        if (err instanceof BadRequestException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }

        if (err instanceof NotFoundException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }

        res.status(500).json({
            error: "InternalServerError",
            message: "Ocurrió un error interno al obtener el turno."
        });
    }
}

const appointments_get_by_user_controller = async (
    req: Request,
    res: Response
) => {
    try {
        const appointments = await get_appointments_by_user_service(req.userId!);

        res.status(200).json({
            message: "Obtuvo los turnos del usuario",
            data: appointments
        });
    } catch (err) {
        res.status(404).json({
            message: "Error al obtener los turnos del usuario",
            error: err instanceof Error
                ? err.message
                : "Error desconocido"
        });
    }
};

const appointment_cancel_controller = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const cancelled = await appointment_cancelled(req.params.id, req.userId!);

        res.status(200).json({
            message: "Canceló el turno correctamente",
            data: cancelled
        }); 
    } catch(err){
        if (err instanceof BadRequestException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }

        if (err instanceof NotFoundException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }

        if (err instanceof ConflictException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
    }
}

export { appointments_get_controller, appointments_get_id_controller, appointments_get_by_user_controller, appointment_create_controller, appointment_cancel_controller };