import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments.entity";
import { Status } from "../interfaces/IAppointment";

export const AppointmentsRepository = AppDataSource
    .getRepository(Appointment)
    .extend({
        validate_appointments: function (date: string, time: string): void {
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

            console.log("========== VALIDACIÓN TURNO ==========");
            console.log("Fecha recibida:", date);
            console.log("Hora recibida:", time);
            console.log("Fecha del turno:", app_date);
            console.log("Fecha actual:", today);
            console.log("¿Es pasado?:", app_date < today);
            console.log("======================================");

            if (app_date < today) {
                throw new Error(
                    "No se pueden agendar turnos en fechas pasadas"
                );
            }

            const day_week = app_date.getDay();

            if (day_week === 0 || day_week === 6) {
                throw new Error(
                    "No se pueden agendar turnos los fines de semana"
                );
            }

            if (hours < 8 || hours >= 18) {
                throw new Error(
                    "No se pueden agendar turnos fuera de horario, de 8 am a 18 pm"
                );
            }
        }, // Este metodo es temporal hasta que se ubique un metodo mejor
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