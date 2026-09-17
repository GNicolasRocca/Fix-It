import bcrypt from "bcrypt"; 
import { CredentialRepository } from "../repositories/credentials.repository";
import { credentials_dto } from "../dtos/credential.dto";
import { Credential } from "../entities/Credentials.entity";

const credential_register_service = async (credential: credentials_dto): Promise<Credential> => {
  const credential_found = await CredentialRepository.find_by_username_repo(credential.username);

  if (credential_found) {
    throw new Error(`El usuario ${credential.username} ya existe`);
  }

  const hashed_password = await bcrypt.hash(credential.password, 10);

  return CredentialRepository.credential_create_repo(
    credential.username,
    hashed_password
  );
}

const check_credentials = async (credential: credentials_dto): Promise<Credential> => {

  const credential_found =
    await CredentialRepository.find_by_username_repo(credential.username);

  if (!credential_found) {
    throw new Error(
      "El nombre de usuario o contraseña es incorrecto"
    );
  }

  const password_match = await bcrypt.compare(
    credential.password,
    credential_found.password
  );

  if (!password_match) {
    throw new Error(
      "El nombre de usuario o contraseña es incorrecto"
    );
  }

  return credential_found;
};

export {
  credential_register_service,
  check_credentials,
};