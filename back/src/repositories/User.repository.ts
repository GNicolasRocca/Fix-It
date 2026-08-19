import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User.entity";

export const UserRepository = AppDataSource.getRepository(User).extend({

})