import { User } from "../entities/User.entity";
import { user_register_DTO } from "../DTOs/user_DTOs";
import { check_credentials_login, create_credentials } from "./credentials.service";
import { Credential } from "../entities/Credentials.entity";
import { Appointment } from "../entities/Appointments.entity";
import { UserRepository } from "../repositories/User.repository";


const get_users_service = async (): Promise<User[]> => {
    return await UserRepository.find()
}

const get_user_id_service = async (id: number): Promise<User | undefined> => {
    const user_found: User | null = await UserRepository.findOne({ 
        where: { id },
        relations: [ "appointments" ]
    });

    if(!user_found) throw new Error(`El usuario con el id: ${id} no fue encontrado`)
    return user_found;
}


const user_register_service = async (user: user_register_DTO): Promise<User | undefined> => {
    const credential: Credential = await create_credentials(user.username, user.password);

    const new_user: User = UserRepository.create({
        name: user.name,
        email: user.email,
        birthdate: new Date(user.birthdate),
        nDni: user.nDni,
        credentials: credential
    })

    return await UserRepository.save(new_user)
}

const user_login_service = async (username: string, password: string) => {
    const id_credential: number | null = await check_credentials_login(username, password);
    if (!id_credential) throw new Error("Credenciales incorrectas");

    const user_login = await UserRepository.findOne({
        where: {
            credentials: {
                id: id_credential
            }
        }
    })

    return user_login;
}

export { get_users_service, get_user_id_service, user_register_service, user_login_service };