interface user_register_DTO{
    name: string,
    email: string,
    birthdate: Date,
    nDni: number,
    username: string,
    password: string
}

interface user_login_DTO{
    username: string,
    password: string
}

export { user_register_DTO, user_login_DTO };