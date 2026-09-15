import bcrypt from "bcrypt";
import { User } from "../entities/User.entity";
import { user_register_dto } from "../dtos/user.dto";
import { check_credentials_login } from "./credentials.service";
import { UsersRepository } from "../repositories/users.repository";
import { CredentialRepository } from "../repositories/credentials.repository";

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

    const username_found = await CredentialRepository.find_by_username_repo(user.username);

    if (username_found) {
        throw new Error("El usuario ya se encuentra registrado");
    }

    const hashed_password = await bcrypt.hash(user.password, 10);

    const new_credential = CredentialRepository.credential_create_repo(user.username, hashed_password);

    const new_user = await UsersRepository.user_register_repo(user, new_credential);

    return new_user;
}


const users_get_service = async (): Promise<User[]> => {
    return await UsersRepository.find_all_users_repo();
}

const user_get_id_service = async (id: number): Promise<User | null> => {
    const user_found = await UsersRepository.find_by_id_repo(id);

    if(!user_found) throw new Error(`El usuario con el id: ${id} no fue encontrado`);
    
    return user_found;
}

const user_login_service = async (username: string, password: string) => {
    const id_credential: number | null = await check_credentials_login(username, password);
    if (!id_credential) throw new Error("Credenciales incorrectas");

    const user_login = await CredentialRepository.find_by_username_repo(username);

    return user_login;
}

export { users_get_service, user_get_id_service, user_register_service, user_login_service };