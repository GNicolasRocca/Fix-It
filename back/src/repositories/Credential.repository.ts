import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentials.entity";

export const CredentialRepository = AppDataSource.getRepository(Credential).extend({

})
