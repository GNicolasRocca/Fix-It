import { AppDataSource } from "../config/data-source";
import { Credentials } from "../entities/credentials.entity";

export const CredentialRepository = AppDataSource
    .getRepository(Credentials)
    .extend({
        credential_create_repo: function (
            username: string,
            password: string
        ): Credentials {

            return this.create({
                username,
                password
            });
        },

        find_by_username_repo: async function (
            username: string
        ): Promise<Credentials | null> {

        return await this.findOne({
            where: { username },
            relations: ["user"]
        });
        },

        find_by_id_repo: async function (id: string): Promise<Credentials | null> { 
            return this.findOne({
                where: { id }
            });
        },

        edit_username_repo: async function (
            credentialId: string,
            username: string
        ): Promise<void> {

            await this.update(
                { id: credentialId },
                { username }
            );
        }
});