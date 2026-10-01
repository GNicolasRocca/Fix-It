import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsInt,
    MinLength,
    MaxLength,
    Min,
    Matches
} from "class-validator";

export class user_register_dto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La fecha de nacimiento debe tener formato YYYY-MM-DD"
    })
    birthdate: string;

    @IsInt()
    @Min(7)
    nDni: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(50)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {
        message: "La contraseña debe tener al menos 8 caracteres"
    })
    password: string;
}