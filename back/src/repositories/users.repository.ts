import { AppDataSource } from "../config/data-source";
import { user_register_dto } from "../dtos/user.dto";
import { Credential } from "../entities/Credentials.entity";
import { User } from "../entities/User.entity";

export const UsersRepository = AppDataSource
    .getRepository(User)
    .extend({
        user_register_repo: async function (user: user_register_dto, credential: Credential): Promise<User> {
            const new_user = this.create({
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                nDni: user.nDni,
                credentials: credential,
            });

            return await this.save(new_user);
        },

        find_all_users_repo: async function (): Promise<User[]> {

            return await this.find({
                select: {
                    id: true,
                    name: true,
                    birthdate: true,
                    nDni: true,
                    appointments: true,
                }
            });
        },

        find_by_id_repo: async function (id: number): Promise<User | null> {
            
            return await this.findOne({
                where: { id },
                relations: [ "appointments" ]
            });
        },

        find_by_email_repo: async function (email: string): Promise<User | null> {

            return await this.findOne({
                where: { email },
                relations: [ "appointments" ]
            });
        },

        find_by_dni_repo: async function (nDni: number): Promise<User | null> {

            return await this.findOne({
                where: { nDni },
                relations: [ "appointments" ]
            });
        }
});