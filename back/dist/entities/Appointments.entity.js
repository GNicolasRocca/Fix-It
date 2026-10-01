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
exports.Appointments = void 0;
const typeorm_1 = require("typeorm");
const IAppointment_1 = require("../interfaces/IAppointment");
const users_entity_1 = require("./users.entity");
let Appointments = class Appointments {
};
exports.Appointments = Appointments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Appointments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: false }),
    __metadata("design:type", String)
], Appointments.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 5, nullable: false }),
    __metadata("design:type", String)
], Appointments.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (users) => users.appointments, { nullable: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", users_entity_1.Users)
], Appointments.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", nullable: false, enum: IAppointment_1.Status, default: IAppointment_1.Status.active }),
    __metadata("design:type", String)
], Appointments.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Appointments.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Appointments.prototype, "updateAt", void 0);
exports.Appointments = Appointments = __decorate([
    (0, typeorm_1.Entity)("appointments")
], Appointments);
