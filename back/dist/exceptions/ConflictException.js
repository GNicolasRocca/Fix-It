"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = void 0;
class ConflictException extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictException";
        this.statusCode = 409;
    }
}
exports.ConflictException = ConflictException;
