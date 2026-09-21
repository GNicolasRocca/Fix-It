"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
server.use(express_1.default.json());
server.use((req, res, next) => {
    console.log("Solicitud recibida:", req.method, req.url);
    next();
});
server.use(index_router_1.default);
exports.default = server;
