import { CredentialRepository } from "../repositories/credentials.repository";
import { credentials_dto } from "../dtos/credential.dto";
import { UsersRepository } from "../repositories/users.repository";
import User from "../interfaces/IUser";


const credential_register_service = async (
  user: credentials_dto
): Promise<User> => {

  const new_user = UsersRepository.create(user);

  await create_credentials(user.username, user.password);

  return await UsersRepository.save(new_user);
};

const create_credentials = async (
  username: string,
  password: string
): Promise<Credential> => {
  try {
    await check_credentials(username);

    const new_credential = CredentialRepository.create({
      username,
      password,
    });

    return await CredentialRepository.save(new_credential);

  } catch (error) {

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Error desconocido");
  }
};


const check_credentials = async ( // esto creo que va en el repo
  username: string
): Promise<void> => {

  const credential_found = await CredentialRepository.findOne({
    where: {
      username,
    },
  });

  if (credential_found) {
    throw new Error(`El usuario ${username} ya existe`);
  }
};


const check_credentials_login = async (
  username: string,
  password: string
): Promise<number> => {

  const credential_find = await CredentialRepository.findOne({
    where: {
      username,
      password,
    },
  });

  if (!credential_find) {
    throw new Error(
      "El nombre de usuario o contraseña es incorrecto"
    );
  }

  return credential_find.id;
};


export {
  create_credentials,
  credential_register_service,
  check_credentials_login,
};