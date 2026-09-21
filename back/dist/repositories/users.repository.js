"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const data_source_1 = require("../config/data-source");
const User_entity_1 = require("../entities/User.entity");
exports.UsersRepository = data_source_1.AppDataSource
    .getRepository(User_entity_1.User)
    .extend({
    user_register_repo: function (user, credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const new_user = this.create({
                name: user.name,
                email: user.email,
                birthdate: user.birthdate,
                nDni: user.nDni,
                credentials: credential,
            });
            return yield this.save(new_user);
        });
    },
    find_all_users_repo: function () {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                select: {
                    id: true,
                    name: true,
                    birthdate: true,
                    nDni: true,
                    appointments: true,
                }
            });
        });
    },
    find_by_id_repo: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: { id },
                relations: ["appointments"]
            });
        });
    },
    find_by_email_repo: function (email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: { email },
                relations: ["appointments"]
            });
        });
    },
    find_by_dni_repo: function (nDni) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: { nDni },
                relations: ["appointments"]
            });
        });
    }
});
