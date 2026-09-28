export class ConflictException extends Error {
    statusCode: number;

    constructor(message: string) {
        super(message);
        this.name = "ConflictException";
        this.statusCode = 409;
    }
}