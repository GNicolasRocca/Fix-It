// 1:16 - 21/10 correcion appointment service
import { calendar_appointment_DTO } from "../DTOs/appointment_DTOs";
import { get_user_id_service } from "./users.service";
import { Appointment } from "../entities/Appointments.entity";
import { AppointmentsRepository } from "../repositories/Appointments.repository";
import { User } from "../entities/User.entity";
import { Status } from "../interfaces/IAppointment";

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

const calendar_appointment = async (app: calendar_appointment_DTO): Promise<Appointment> => {
    AppointmentsRepository.validate_appointments(app.date, app.time)

    const user_found: User | undefined  = await get_user_id_service(app.userId);

     if (!user_found) {
        throw new Error(`Usuario con id ${app.userId} no encontrado`);
    }

    const new_appointment: Appointment = AppointmentsRepository.create({
        date: app.date,
        time: app.time,
        user: user_found!
    })

    await AppointmentsRepository.save(new_appointment);

    return new_appointment;
}


const appointment_cancelled = async (id: number): Promise<Appointment> => {
    const appointment_found: Appointment | null = await AppointmentsRepository.findOneBy({ id }); // si no usar findOne asecas

    if(!appointment_found) throw Error(`El turno ${id} no fue encontrado`);
    appointment_found.status = Status.cancelled
    await AppointmentsRepository.save(appointment_found);
    return appointment_found;
}

export { get_appointments_service, get_appointment_id_service, get_appointments_by_user_service, calendar_appointment, appointment_cancelled };