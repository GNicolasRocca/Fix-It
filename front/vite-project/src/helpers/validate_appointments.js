export const validate_turnos = (inputs) => {
    const errors = {};

    if (!inputs.date?.trim()) {
        errors.date = "Debe seleccionar una fecha";
    }

    if (!inputs.time?.trim()) {
        errors.time = "Debe seleccionar un horario";
    }

    return errors;
};