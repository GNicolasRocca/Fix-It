"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
class BadRequestException extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestException";
        this.statusCode = 400;
    }
}
exports.BadRequestException = BadRequestException;
