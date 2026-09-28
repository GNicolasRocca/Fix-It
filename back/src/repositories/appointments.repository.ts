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
        find_appointments_repository: async function (): Promise<Appointment[]> {
            return await this.find();
        },
        find_appointment_by_id_repository: async function (id: number): Promise<Appointment | null> {
            return await this.findOne({
                where: { id } 
            });
        },
        find_appointment_by_user_id_repository: async function (id: number): Promise<Appointment[]> {
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
            appointmentId: number,
            userId: number
        ): Promise<Appointment | null> {
            return await this.findOne({
                where: {
                id: appointmentId,
                user: {
                    id: userId
                }
            }
            });
        },
        cancel_appointment_repository: async function (appointment: Appointment): Promise<Appointment> {
            appointment.status = Status.cancelled;

            return await this.save(appointment);
        },
    })