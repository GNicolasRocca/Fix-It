import { Request, Response } from "express";
import { get_appointments_service, get_appointment_id_service, get_appointments_by_user_service, calendar_appointment, appointment_cancelled_service } from "../handlers/appointments.service";
import { calendar_appointment_dto } from "../dtos/appointments.dto";
import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { ConflictException } from "../exceptions/ConflictException";
import { Role } from "../interfaces/IRole";

const appointment_create_controller = async (req: Request<unknown, unknown, calendar_appointment_dto>, res: Response) => {
    try {
        const new_appointment = await calendar_appointment(req.body, req.userId!);

        res.status(201).json({
           message: "Creó un nuevo turno",
           data: {
                id: new_appointment.id,
                date: new_appointment.date,
                time: new_appointment.time,
                status: new_appointment.status
           }
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
    try{
        const appointments = await get_appointments_service();
        res.status(200).json({
            message: "Obtuvo todos los turnos",
            data: appointments.map(({ id, date, time, status, user }) => ({
                id, date, time, status,
                ...(req.userRole === Role.admin && user ? {
                    user: {
                        id: user.id, name: user.name, email: user.email,
                        birthdate: user.birthdate, nDni: user.nDni, role: user.role
                    }
                } : {})
            }))
        });    
    } catch(err){
        res.status(500).json({
            message: "Error al obtener los turnos",
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
            await get_appointment_id_service(req.params.id);

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

const appointments_get_by_user_admin_controller = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const appointments = await get_appointments_by_user_service(userId);

        res.status(200).json({
            message: `Turnos obtenidos correctamente`,
            appointments
        });

    } catch (err) {
        res.status(500).json({
            message: "Error al obtener los turnos del usuario",
            error: err instanceof Error
                ? err.message
                : "Error desconocido"
        });
    }

}

const appointment_cancel_controller = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const cancelled = await appointment_cancelled_service(req.params.id, req.userId!);

        res.status(200).json({
            message: "Canceló el turno correctamente",
            data: cancelled
        }); 
    } catch(err) {
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

const appointment_admin_cancel_controller = async (req: Request<{ userId: string; appointmentId: string }>, res: Response) => {
    try {
        const appointment_cancelled = await appointment_cancelled_service(req.params.appointmentId, req.params.userId);

        res.status(200).json({
            message: "Canceló el turno correctamente",
            data: appointment_cancelled
        })
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

        if (err instanceof ConflictException) {
            res.status(err.statusCode).json({
                error: err.name,
                message: err.message
            });
            return;
        }
        res.status(500).json({ message: "Error interno al cancelar el turno." });
    }
}

export { appointments_get_controller, appointments_get_id_controller, appointments_get_by_user_controller, appointments_get_by_user_admin_controller, appointment_create_controller, appointment_cancel_controller, appointment_admin_cancel_controller };
