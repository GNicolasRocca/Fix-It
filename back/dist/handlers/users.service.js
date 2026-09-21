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
exports.user_login_service = exports.user_register_service = exports.user_get_id_service = exports.users_get_service = void 0;
const credentials_service_1 = require("./credentials.service");
const users_repository_1 = require("../repositories/users.repository");
const user_register_service = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email_found = yield users_repository_1.UsersRepository.find_by_email_repo(user.email);
    if (email_found) {
        throw new Error("El email ya se encuentra registrado");
    }
    const dni_found = yield users_repository_1.UsersRepository.find_by_dni_repo(user.nDni);
    if (dni_found) {
        throw new Error("El DNI ya se encuentra registrado");
    }
    const new_credential = yield (0, credentials_service_1.credential_register_service)({
        username: user.username, password: user.password,
    });
    const new_user = yield users_repository_1.UsersRepository.user_register_repo(user, new_credential);
    return new_user;
});
exports.user_register_service = user_register_service;
const user_login_service = (credential_login) => __awaiter(void 0, void 0, void 0, function* () {
    const login_check = yield (0, credentials_service_1.check_credentials)(credential_login);
    if (!login_check.user) {
        throw new Error("No se encontró el usuario asociado a las credenciales");
    }
    return login_check;
});
exports.user_login_service = user_login_service;
const users_get_service = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_repository_1.UsersRepository.find_all_users_repo();
});
exports.users_get_service = users_get_service;
const user_get_id_service = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user_found = yield users_repository_1.UsersRepository.find_by_id_repo(id);
    if (!user_found)
        throw new Error(`El usuario con el id: ${id} no fue encontrado`);
    return user_found;
});
exports.user_get_id_service = user_get_id_service;
