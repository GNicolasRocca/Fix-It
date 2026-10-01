export const validate = (inputs) => {
    const errors = {};

    if (!inputs.name?.trim()) {
        errors.name = "Debe colocar un nombre";
    }

    if (!inputs.email.trim()) {
        errors.email = "Debe ingresar un email";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        errors.email = "Debe ingresar un email válido";
    }

    if (!inputs.birthdate) {
        errors.birthdate = "Debe colocar una fecha de nacimiento";
    }

    if (!inputs.nDni) {
        errors.nDni = "Debe colocar un DNI";
    } else if (!inputs.nDni?.match(/^\d+$/)) {
        errors.nDni = "El DNI debe ser numérico"
    }

    if (!inputs.username?.trim()) {
        errors.username = "Debe colocar un nombre de usuario";
    } else if (inputs.username.length < 4) {
        errors.username = "El usuario debe tener al menos 4 caracteres";
    }

    if (!inputs.password || inputs.password.length < 8) {
        errors.password = "Debe tener la contraseña al menos 8 cáracteres";
    }

    return errors;
}