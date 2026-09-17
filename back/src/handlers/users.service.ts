import { User } from "../entities/User.entity";
import { user_register_dto } from "../dtos/user.dto";
import { check_credentials, credential_register_service } from "./credentials.service";
import { UsersRepository } from "../repositories/users.repository";
import { credentials_dto } from "../dtos/credential.dto";

const user_register_service = async (
  user: user_register_dto
): Promise<User> => {
    const email_found = await UsersRepository.find_by_email_repo(user.email);

    if (email_found) {
        throw new Error("El email ya se encuentra registrado");
    }

    const dni_found = await UsersRepository.find_by_dni_repo(user.nDni);

    if (dni_found) {
        throw new Error("El DNI ya se encuentra registrado");
    }

    const new_credential = await credential_register_service({ 
        username: user.username, password: user.password, 
    });

    const new_user = await UsersRepository.user_register_repo(user, new_credential);

    return new_user;
}

const user_login_service = async (credential_login: credentials_dto) => {
    const login_check = await check_credentials(credential_login);

    if (!login_check.user) {
        throw new Error("No se encontró el usuario asociado a las credenciales");
    }

    return login_check;
}

const users_get_service = async (): Promise<User[]> => {
    return await UsersRepository.find_all_users_repo();
}

const user_get_id_service = async (id: number): Promise<User | null> => {
    const user_found = await UsersRepository.find_by_id_repo(id);

    if(!user_found) throw new Error(`El usuario con el id: ${id} no fue encontrado`);
    
    return user_found;
}

export { users_get_service, user_get_id_service, user_register_service, user_login_service };