import { Request, Response } from "express";
import { get_appointments_service, get_appointment_id_service, get_appointments_by_user_service, calendar_appointment, appointment_cancelled } from "../handlers/appointments.service";
import { calendar_appointment_dto } from "../dtos/appointments.dto";

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

const appointments_get_id_controller = async (req: Request<{ id: string }>, res: Response) => {
    const appointment_id = await get_appointment_id_service(parseInt(req.params.id))

    try{
        res.status(200).json({
            message: "Obtuvó un turno por ID",
            data: appointment_id
        });
    } catch(err){
        res.status(404).json({
            message: "Error obtener un turno por ID, turno no encontrado",
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

const appointments_get_by_user_controller = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.userId) {
            res.status(401).json({
                message: "Usuario no autenticado"
            });

            return;
        }

        const appointments = await get_appointments_by_user_service(req.userId);

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

const appointment_create_controller = async (req: Request<unknown, unknown, calendar_appointment_dto>, res: Response) => {
    try {
        if (!req.userId) {
            res.status(401).json({
            message: "Usuario no autenticado"
        });

        return;
        }

        const new_appointment = await calendar_appointment(req.body, req.userId);
        res.status(201).json({
           message: "Creó un nuevo turno",
           data: new_appointment
        });
    }
    catch (err) {
        res.status(400).json({
            message:"Error al crear un nuevo turno, datos incorrectos",
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

const appointment_edit_controller = async (req: Request<{ id: string }>, res: Response) => {
    try{
        const cancelled = await appointment_cancelled(parseInt(req.params.id));
        res.status(200).json({
            message: "Canceló un turno",
            data: cancelled
        }); 
    } catch(err){
        res.status(404).json({
            message:"Error al cancelar un turno, turno no encontrado",
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

export { appointments_get_controller, appointments_get_id_controller, appointments_get_by_user_controller, appointment_create_controller, appointment_edit_controller };

// hacer validaciones de todo