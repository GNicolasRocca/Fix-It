import { calendar_appointment_dto } from "../dtos/appointments.dto";
import { user_get_id_service } from "./users.service";
import { Appointments } from "../entities/appointments.entity";
import { AppointmentsRepository } from "../repositories/appointments.repository";
import { BadRequestException } from "../exceptions/BadRequestException";
import { NotFoundException } from "../exceptions/NotFoundException";
import { ConflictException } from "../exceptions/ConflictException";
import { Status } from "../interfaces/IAppointment";

const calendar_appointment = async (
    app: calendar_appointment_dto,
    userId: string
): Promise<Appointments> => {
    const user_found = await user_get_id_service(userId);

    if (!user_found) {
        throw new BadRequestException(
            `El usuario con id ${userId} no existe.`
        );
    }

    await validate_appointment(app.date, app.time);

    const active_appointments =
        await AppointmentsRepository.count_active_appointments_by_user(userId);

    if (active_appointments >= 5) {
        throw new BadRequestException(
            "Alcanzaste el límite máximo de 5 turnos activos. Para solicitar otro turno, primero debés cancelar uno."
        );
    }
    // ---------------------------------------------------------------

    const new_appointment = await AppointmentsRepository.calendar_appointment_repository(
        app.date, 
        app.time,
        user_found
        );

    return new_appointment;
};

const get_appointments_service = async (): Promise<Appointments[]> => {
    return await AppointmentsRepository.find_appointments_repository();
}

const get_appointment_id_service = async (id: string): Promise<Appointments> => {
    const appointment_found = await AppointmentsRepository.find_appointment_by_id_repository(id);

    if(!appointment_found) throw new NotFoundException(`El turno con ${id} no fue encontrado`)

    return appointment_found;
}

const get_appointments_by_user_service = async (
    userId: string
): Promise<Appointments[]> => {
    return await AppointmentsRepository.find_appointment_by_user_id_repository(userId);
};

const appointment_cancelled = async (appointmentId: string, userId: string): Promise<Appointments> => {
    const appointment_found = await AppointmentsRepository.find_appointment_by_id_and_user_repository(appointmentId, userId);
    
     if (!appointment_found) {
        throw new NotFoundException(
            `El turno con id ${appointmentId} no fue encontrado.`
        );
    }

    if (appointment_found.status === Status.cancelled) {
        throw new ConflictException(
            `El turno con id ${appointmentId} ya se encuentra cancelado.`
        );
    }

    const cancelled_appointment = await AppointmentsRepository.cancel_appointment_repository(appointment_found);

    return cancelled_appointment;
}

const validate_appointment =  async (date: string, time: string) => {
    const appointment_taken = await AppointmentsRepository.find_active_appointment_repository(date, time);

    if (appointment_taken) {
        throw new ConflictException("Ya existe un turno reservado en ese horario");
    }

    const [year, month, day] = date.split("-").map(Number);
    const [hours, minutes] = time.split(":").map(Number);

    const app_date = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        0,
        0
    );

    const today = new Date();

    if (app_date < today) {
        throw new BadRequestException(
            "No se pueden agendar turnos en fechas pasadas a la actual."
        );
    }

    const day_week = app_date.getDay();

    if (day_week === 0 || day_week === 6) {
        throw new BadRequestException("No se pueden agendar turnos los fines de semana."); 
    }

    if (hours < 8 || hours >= 18) {
        throw new BadRequestException(
            "No se pueden agendar turnos fuera de horario, de 8 am a 18 pm."
        );
    }

    if (minutes !== 0) {
        throw new BadRequestException(
            "Los turnos deben comenzar en una hora exacta."
        );
    }
};

export { get_appointments_service, get_appointment_id_service, get_appointments_by_user_service, calendar_appointment, appointment_cancelled };