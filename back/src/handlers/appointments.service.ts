import { calendar_appointment_dto } from "../dtos/appointments.dto";
import { user_get_id_service } from "./users.service";
import { Appointment } from "../entities/Appointments.entity";
import { AppointmentsRepository } from "../repositories/appointments.repository";
import { Status } from "../interfaces/IAppointment";
import { BadRequestException } from "../exceptions/BadRequestException";

const calendar_appointment = async (
    app: calendar_appointment_dto,
    userId: number
): Promise<Appointment> => {
    const user_found = await user_get_id_service(userId);

    if (!user_found) {
        throw new BadRequestException(
            `El usuario con id ${userId} no existe.`
        );
    }

    validate_appointment(app.date, app.time);

    // Esto es temporal hasta que implemente alguna whitelist
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

// Pasar metodos al repo de aca para abajo
const get_appointments_service = async (): Promise<Appointment[]> => {
    const appointments = await AppointmentsRepository.find();

    if(appointments.length === 0) throw Error(`No hay turnos en la base de datos`)

    return appointments;
}

const get_appointment_id_service = async (id: number): Promise<Appointment> => {
    const appointment_found: Appointment | null = await AppointmentsRepository.findOne({
        where: {
            id: id
        } 
    });

    if(!appointment_found) throw Error(`El turno no ${id} fue encontrado`)
    return appointment_found;
}

const get_appointments_by_user_service = async (
    userId: number
): Promise<Appointment[]> => {
        const appointments = await AppointmentsRepository.find({
        where: {
            user: {
                id: userId
            }
        },
        order: {
            date: "ASC",
            time: "ASC"
        }
    });

    return appointments;
};

const appointment_cancelled = async (id: number): Promise<Appointment> => {
    const appointment_found: Appointment | null = await AppointmentsRepository.findOneBy({ id }); // si no usar findOne asecas

    if(!appointment_found) throw Error(`El turno ${id} no fue encontrado`);
    appointment_found.status = Status.cancelled
    await AppointmentsRepository.save(appointment_found);
    return appointment_found;
}

const validate_appointment = (date: string, time: string) => {
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
};

export { get_appointments_service, get_appointment_id_service, get_appointments_by_user_service, calendar_appointment, appointment_cancelled };