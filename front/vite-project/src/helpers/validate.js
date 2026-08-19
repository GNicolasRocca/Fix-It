export const validate = (inputs) => {
    const errors = {}

    if (!inputs.name?.trim()) errors.name = "Debe colocar un nombre";
    if (!inputs.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Email inválido";
    if (!inputs.birthdate) errors.birthdate = "Debe colocar una fecha de nacimiento";
    if (!inputs.nDni?.match(/^\d+$/)) errors.nDni = "El DNI debe ser numérico";
    if (!inputs.username?.trim()) errors.username = "Debe colocar un nombre de usuario";
    if (!inputs.password || inputs.password.length < 6) errors.password = "Debe tener al menos 6 caracteres";

    return errors;
}