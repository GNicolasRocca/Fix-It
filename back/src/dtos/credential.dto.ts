import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class credential_dto {
    @IsString()
    @IsNotEmpty({
        message: "El nombre de usuario es obligatorio"
    })
    @MaxLength(50, {
        message: "El nombre de usuario no puede superar los 50 caracteres"
    })
    username: string;

    @IsString()
    @IsNotEmpty({
        message: "La contraseña es obligatoria"
    })
    @MinLength(8, {
        message: "La contraseña debe tener al menos 8 caracteres"
    })
    password: string;
}