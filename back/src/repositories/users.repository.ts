import { AppDataSource } from "../config/data-source";
import { user_edit_dto, user_register_dto } from "../dtos/users.dto";
import { Credentials } from "../entities/credentials.entity";
import { Users } from "../entities/users.entity";

export const UsersRepository = AppDataSource
    .getRepository(Users)
    .extend({
        user_register_repo: async function (user: user_register_dto, credential: Credentials): Promise<Users> {
            const new_user = this.create({
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                nDni: user.nDni,
                credentials: credential,
            });
            
            return await this.save(new_user);
        },

        find_all_users_repo: async function (): Promise<Users[]> {

            return await this.find({
                select: {
                    id: true,
                    name: true,
                    birthdate: true,
                    nDni: true,
                    role: true,
                    createAt: true,
                    updateAt: true,
                    appointments: true,
                    credentials: {
                        id: true,
                        updateAt: true,
                        username: true,
                    },
                },
                relations: {
                    appointments: true,
                    credentials: true,
                }
            });
        },

        find_by_id_repo: async function (id: string): Promise<Users | null> {
            
            return await this.findOne({
                where: { id },
                relations: [ "appointments", "credentials" ]
            });
        },

        find_by_email_repo: async function (email: string): Promise<Users | null> {

            return await this.findOne({
                where: { email },
                relations: [ "appointments" ]
            });
        },

        find_by_dni_repo: async function (nDni: number): Promise<Users | null> {

            return await this.findOne({
                where: { nDni },
                relations: [ "appointments" ]
            });
        },

        edit_user_by_id_repo: async function (id: string, user: Omit<user_edit_dto, "username">): Promise<void> {
            await this.update({ id }, user );
        }
});