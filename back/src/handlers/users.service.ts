import { Users } from "../entities/users.entity";
import { user_edit_dto, user_register_dto } from "../dtos/users.dto";
import { check_credentials, credential_register_service } from "./credentials.service";
import { UsersRepository } from "../repositories/users.repository";
import { credential_dto } from "../dtos/credential.dto";
import { NotFoundException } from "../exceptions/NotFoundException";
import { CredentialRepository } from "../repositories/credentials.repository";
import { ConflictException } from "../exceptions/ConflictException";

const user_register_service = async (
  user: user_register_dto
): Promise<Users> => {
    const email_found = await UsersRepository.find_by_email_repo(user.email);

    if (email_found) {
        throw new Error("El email ya fue usado");
    }

    const dni_found = await UsersRepository.find_by_dni_repo(user.nDni);

    if (dni_found) {
        throw new Error("El DNI ya fue usado");
    }

    const new_credential = await credential_register_service({ 
        username: user.username, password: user.password, 
    });

    const new_user = await UsersRepository.user_register_repo(user, new_credential);

    return new_user;
}

const user_login_service = async (credential_login: credential_dto) => {
    const login_check = await check_credentials(credential_login);

    if (!login_check.user) {
        throw new NotFoundException("No se encontró el usuario asociado a las credenciales");
    }

    if (!login_check.user.isActive) {
        throw new Error("Este usuario fue eliminado");
    }

    return login_check;
}

const users_get_service = async (): Promise<Users[]> => {
    return await UsersRepository.find_all_users_repo();
}

const user_get_id_service = async (id: string): Promise<Users> => {
    const user_found = await UsersRepository.find_by_id_repo(id);

    if (!user_found) throw new NotFoundException(`Su usuario con id: ${id} no fue encontrado`);
    
    return user_found;
}

const user_get_id_admin_service = async (id: string): Promise<Users> => {
    const user_found = await UsersRepository.find_by_id_repo(id);

    if (!user_found) throw new NotFoundException(`El usuario con el id: ${id} no fue encontrado`);

    return user_found;
}

const user_edit_service = async (id: string, user: user_edit_dto): Promise<Users> => {
    const user_found = await user_get_id_service(id);

    const {
        username,
        ...user_data
    } = user;

    await UsersRepository.edit_user_by_id_repo(id, user_data);

    if (username) {
        await CredentialRepository.edit_username_repo(
            user_found.credentials.id,
            username
        );
    }

    const user_updated = await user_get_id_service(id);

    return user_updated;
}

const user_delete_service = async (id: string): Promise<Users> => {
    const user_found = await user_get_id_service(id);

    if (!user_found.isActive) {
        throw new ConflictException(
            "El usuario ya se encuentra desactivado"
        );
    }

    await UsersRepository.user_delete_repo(user_found.id);

    return user_found;
}

export { user_register_service, user_login_service, users_get_service, user_get_id_service,  user_get_id_admin_service, user_edit_service, user_delete_service };