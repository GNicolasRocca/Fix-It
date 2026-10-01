"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const credentials_entity_1 = require("./credentials.entity");
const appointments_entity_1 = require("./appointments.entity");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", unique: true, length: 50, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", Date)
], Users.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer", unique: true, nullable: false }),
    __metadata("design:type", Number)
], Users.prototype, "nDni", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => credentials_entity_1.Credentials, (credentials) => credentials.user, { nullable: false, cascade: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", credentials_entity_1.Credentials)
], Users.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (appointments) => appointments.user),
    __metadata("design:type", Array)
], Users.prototype, "appointments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Users.prototype, "updateAt", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)("users")
], Users);
