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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_delete_service = exports.user_edit_service = exports.user_get_id_admin_service = exports.user_get_id_service = exports.users_get_service = exports.user_login_service = exports.user_register_service = void 0;
const users_entity_1 = require("../entities/users.entity");
const credentials_service_1 = require("./credentials.service");
const users_repository_1 = require("../repositories/users.repository");
const NotFoundException_1 = require("../exceptions/NotFoundException");
const credentials_repository_1 = require("../repositories/credentials.repository");
const ConflictException_1 = require("../exceptions/ConflictException");
const data_source_1 = require("../config/data-source");
const appointments_entity_1 = require("../entities/appointments.entity");
const IAppointment_1 = require("../interfaces/IAppointment");
const user_register_service = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email_found = yield users_repository_1.UsersRepository.find_by_email_repo(user.email);
    if (email_found) {
        throw new Error("El email ya fue usado");
    }
    const dni_found = yield users_repository_1.UsersRepository.find_by_dni_repo(user.nDni);
    if (dni_found) {
        throw new Error("El DNI ya fue usado");
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
        throw new NotFoundException_1.NotFoundException("No se encontró el usuario asociado a las credenciales");
    }
    if (!login_check.user.isActive) {
        throw new Error("Este usuario fue eliminado");
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
        throw new NotFoundException_1.NotFoundException(`Su usuario con id: ${id} no fue encontrado`);
    return user_found;
});
exports.user_get_id_service = user_get_id_service;
const user_get_id_admin_service = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user_found = yield users_repository_1.UsersRepository.find_by_id_repo(id);
    if (!user_found)
        throw new NotFoundException_1.NotFoundException(`El usuario con el id: ${id} no fue encontrado`);
    return user_found;
});
exports.user_get_id_admin_service = user_get_id_admin_service;
const user_edit_service = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const user_found = yield user_get_id_service(id);
    const { username } = user, user_data = __rest(user, ["username"]);
    yield users_repository_1.UsersRepository.edit_user_by_id_repo(id, user_data);
    if (username) {
        yield credentials_repository_1.CredentialRepository.edit_username_repo(user_found.credentials.id, username);
    }
    const user_updated = yield user_get_id_service(id);
    return user_updated;
});
exports.user_edit_service = user_edit_service;
const user_delete_service = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield data_source_1.AppDataSource.transaction((manager) => __awaiter(void 0, void 0, void 0, function* () {
        const user_found = yield manager.findOne(users_entity_1.Users, {
            where: { id }
        });
        if (!user_found) {
            throw new NotFoundException_1.NotFoundException("No se encontró el usuario");
        }
        if (!user_found.isActive) {
            throw new ConflictException_1.ConflictException("El usuario ya se encuentra desactivado");
        }
        yield manager.update(users_entity_1.Users, { id }, { isActive: false });
        yield manager.update(appointments_entity_1.Appointments, {
            user: { id },
            status: "active"
        }, {
            status: IAppointment_1.Status.cancelled
        });
        user_found.isActive = false;
        return user_found;
    }));
});
exports.user_delete_service = user_delete_service;
