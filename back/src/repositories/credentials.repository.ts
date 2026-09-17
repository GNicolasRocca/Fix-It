import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentials.entity";

export const CredentialRepository = AppDataSource
    .getRepository(Credential)
    .extend({
        credential_create_repo: function (
            username: string,
            password: string
        ): Credential {

            return this.create({
                username,
                password
            });
        },

        find_by_username_repo: async function (
            username: string
        ): Promise<Credential | null> {

        return await this.findOne({
            where: { username },
            relations: ["user"]
        });
        },

        find_by_id_repo: async function (id: number): Promise<Credential | null> { 
            return this.findOne({
                where: { id }
            });
        }
});