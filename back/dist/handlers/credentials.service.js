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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_credentials = exports.credential_register_service = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const credentials_repository_1 = require("../repositories/credentials.repository");
const credential_register_service = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const credential_found = yield credentials_repository_1.CredentialRepository.find_by_username_repo(credential.username);
    if (credential_found) {
        throw new Error(`El usuario ${credential.username} ya existe`);
    }
    const hashed_password = yield bcrypt_1.default.hash(credential.password, 10);
    return credentials_repository_1.CredentialRepository.credential_create_repo(credential.username, hashed_password);
});
exports.credential_register_service = credential_register_service;
const check_credentials = (credential) => __awaiter(void 0, void 0, void 0, function* () {
    const credential_found = yield credentials_repository_1.CredentialRepository.find_by_username_repo(credential.username);
    if (!credential_found) {
        throw new Error("El nombre de usuario o contraseña es incorrecto");
    }
    const password_match = yield bcrypt_1.default.compare(credential.password, credential_found.password);
    if (!password_match) {
        throw new Error("El nombre de usuario o contraseña es incorrecto");
    }
    return credential_found;
});
exports.check_credentials = check_credentials;
