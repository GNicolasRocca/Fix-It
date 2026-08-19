import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointments.entity";

export const AppointmentRepository = AppDataSource.getRepository(Appointment).extend({
    validate_appointments: function(date: Date, time: string): void{
        const [ hours, minutes ] = time.split(":").map(Number);
        const app_date = new Date(date);
        app_date.setHours(hours, minutes, 0)
        const today = new Date()

        const app_date_argen = new Date(app_date.getTime() - 3 * 60 * 60 * 1000);
        const app_date_now_argen = new Date(today.getTime() - 3 * 60 * 60 * 1000);
        const day_week = app_date_argen.getUTCDay()

        if(app_date_argen < app_date_now_argen) throw new Error("No se pueden agendar turnos en fechas pasadas");
        if(day_week === 5 || day_week === 6) throw new Error("No se pueden agendar turnos los fines de semanas");
        if(hours < 8 || hours >= 18) throw new Error("No se pueden agendar turnos fuera de horario, de 8 am a 18 pm"); // ver el horario si lo cambio
    }

    // despues el profe hace una validacion de si ya se saco un turno, pero tenemos recursos ilimitados para sacar turnos 1:13 -- 21/10
    // pero un usuario no puede estar en varios turnos al mismo tiempo
})
