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
exports.CredentialRepository = void 0;
const data_source_1 = require("../config/data-source");
const Credentials_entity_1 = require("../entities/Credentials.entity");
exports.CredentialRepository = data_source_1.AppDataSource
    .getRepository(Credentials_entity_1.Credential)
    .extend({
    credential_create_repo: function (username, password) {
        return this.create({
            username,
            password
        });
    },
    find_by_username_repo: function (username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: { username },
                relations: ["user"]
            });
        });
    },
    find_by_id_repo: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({
                where: { id }
            });
        });
    }
});
