import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments.entity";
import { User } from "../entities/User.entity";
import { Status } from "../interfaces/IAppointment";

export const AppointmentsRepository = AppDataSource
    .getRepository(Appointment)
    .extend({
        calendar_appointment_repository: async function (
            date: string,
            time: string,
            user: User,
        ): Promise<Appointment> {
            const new_appointment = this.create({ date, time, user})

            return await this.save(new_appointment);
        },
        // Este metodo es temporal hasta que se ubique un metodo mejor
        count_active_appointments_by_user: async function (
            userId: number
        ): Promise<number> {
            return await this.count({
                where: {
                    user: {
                        id: userId
                    },
                    status: Status.active
                }
            });
        },
    });