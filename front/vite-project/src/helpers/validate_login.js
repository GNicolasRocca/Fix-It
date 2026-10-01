export const validate_login = (inputs) => {
    const errors = {};

    if (!inputs.username?.trim()) {
        errors.username = "Debe colocar un nombre de usuario";
    }

    if (!inputs.password?.trim()) {
        errors.password = "Debe colocar una contraseña";
    }

    return errors;
}