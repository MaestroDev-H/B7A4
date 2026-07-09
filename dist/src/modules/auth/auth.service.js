"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const jwt_1 = require("../../utils/jwt");
const registerUser = async (payload) => {
    const existing = await prisma_1.default.user.findUnique({ where: { email: payload.email } });
    if (existing) {
        throw new AppError_1.default(409, "A user with this email already exists.");
    }
    const hashedPassword = await bcrypt_1.default.hash(payload.password, config_1.default.bcrypt_salt_rounds);
    const user = await prisma_1.default.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role ?? client_1.Role.CUSTOMER, // self-registration can never create ADMIN
        },
        select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    });
    const token = (0, jwt_1.signToken)({ id: user.id, email: user.email, role: user.role });
    return { user, token };
};
const loginUser = async (payload) => {
    const user = await prisma_1.default.user.findUnique({ where: { email: payload.email } });
    if (!user) {
        throw new AppError_1.default(401, "Invalid email or password.");
    }
    if (user.status === "SUSPENDED") {
        throw new AppError_1.default(403, "Your account has been suspended.");
    }
    const passwordMatch = await bcrypt_1.default.compare(payload.password, user.password);
    if (!passwordMatch) {
        throw new AppError_1.default(401, "Invalid email or password.");
    }
    const token = (0, jwt_1.signToken)({ id: user.id, email: user.email, role: user.role });
    const { password: _pw, ...safeUser } = user;
    return { user: safeUser, token };
};
const getMe = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    });
    if (!user)
        throw new AppError_1.default(404, "User not found.");
    return user;
};
exports.AuthServices = { registerUser, loginUser, getMe };
