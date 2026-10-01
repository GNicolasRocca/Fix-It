import { AppDataSource } from "../config/data-source";
import { Appointments } from "../entities/appointments.entity";
import { Users } from "../entities/users.entity";
import { Status } from "../interfaces/IAppointment";

export const AppointmentsRepository = AppDataSource
    .getRepository(Appointments)
    .extend({
        calendar_appointment_repository: async function (
            date: string,
            time: string,
            user: Users,
        ): Promise<Appointments> {
            const new_appointment = this.create({ date, time, user})

            return await this.save(new_appointment);
        },
        // Este metodo es temporal hasta que se ubique un metodo mejor
        count_active_appointments_by_user: async function (
            userId: string
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
        find_appointments_repository: async function (): Promise<Appointments[]> {
            return await this.find();
        },
        find_appointment_by_id_repository: async function (id: string): Promise<Appointments | null> {
            return await this.findOne({
                where: { id } 
            });
        },
        find_active_appointment_repository: async function (
            date: string,
            time: string
        ): Promise<Appointments | null> {
                return await this.findOne({
                    where: {
                        date,
                        time,
                        status: Status.active
                    }
                })
        },
        find_appointment_by_user_id_repository: async function (id: string): Promise<Appointments[]> {
            return await this.find({
                where: {
                    user: { id }
                },
                order: {
                    date: "ASC",
                    time: "ASC"
                }
            });
        },
        find_appointment_by_id_and_user_repository: async function (
            appointmentId: string,
            userId: string
        ): Promise<Appointments | null> {
            return await this.findOne({
                where: {
                    id: appointmentId,
                    user: {
                        id: userId
                    }
                }
            });
        },
        cancel_appointment_repository: async function (appointment: Appointments): Promise<Appointments> {
            appointment.status = Status.cancelled;

            return await this.save(appointment);
        },
    })