import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsInt,
    MinLength,
    MaxLength,
    Min,
    Matches,
    IsOptional,
    Max
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
    @Min(1000000)
    @Max(99999999)
    nDni: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(50)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    @MaxLength(72, { message: "La contraseña no puede superar los 72 caracteres" })
    @Matches(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula" })
    @Matches(/[a-z]/, { message: "La contraseña debe contener al menos una letra minúscula" })
    @Matches(/[0-9]/, { message: "La contraseña debe contener al menos un número" })
    @Matches(/[^A-Za-z0-9]/, { message: "La contraseña debe contener al menos un carácter especial" })
    password: string;
}

export class user_edit_dto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name?: string;

    @IsOptional()
    @IsString()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La fecha de nacimiento debe tener formato YYYY-MM-DD"
    })
    birthdate?: string;

    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(50)
    username?: string;
}