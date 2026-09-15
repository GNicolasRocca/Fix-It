import { Request, Response } from "express";
import { get_appointments_service, get_appointment_id_service, get_appointments_by_user_service, calendar_appointment, appointment_cancelled } from "../handlers/appointments.service";
import { calendar_appointment_DTO } from "../dtos/appointments.dto";

const turns_get = async (req: Request, res: Response) => {
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

const turns_get_id = async (req: Request<{ id: string }>, res: Response) => {
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

const turns_get_by_user = async (
    req: Request<{ userId: string }>,
    res: Response
) => {
    try {
        const userId = parseInt(req.params.userId);

        const appointments = await get_appointments_by_user_service(userId);

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

const turns_post = async (req: Request<unknown, unknown, calendar_appointment_DTO>, res: Response) => {
    try{
        const new_appointment = await calendar_appointment(req.body);
        res.status(201).json({
           message: "Creó un nuevo turno",
           data: new_appointment
        });
    } catch(err){
        console.error("ERROR EN /turns/schedule:", err);
        res.status(400).json({
            message:"Error al crear un nuevo turno, datos incorrectos",
            error: err instanceof Error ? err.message: "Error desconocido"
        });
    }
}

const turns_put = async (req: Request<{ id: string }>, res: Response) => {
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

export { turns_get, turns_get_id, turns_get_by_user,turns_post, turns_put };

// hacer validaciones de todo