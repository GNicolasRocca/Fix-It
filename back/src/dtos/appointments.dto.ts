import { IsNotEmpty, IsString, Matches } from "class-validator"

export class calendar_appointment_dto{
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La fecha debe tener el formato YYYY-MM-DD"
    })
    date: string;

    @IsString()
    @IsNotEmpty({
        message: "La hora es obligatoria"
    })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "La hora debe tener el formato HH:mm"
    })
    time: string;
}