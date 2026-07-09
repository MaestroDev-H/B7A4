"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jwt_1 = require("../utils/jwt");
const prisma_1 = __importDefault(require("../utils/prisma"));
const auth = (...allowedRoles) => {
    return (0, catchAsync_1.default)(async (req, _res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError_1.default(401, "You are not authorized. Please log in.");
        }
        const token = authHeader.split(" ")[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = await prisma_1.default.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            throw new AppError_1.default(401, "User no longer exists.");
        }
        if (user.status === "SUSPENDED") {
            throw new AppError_1.default(403, "Your account has been suspended.");
        }
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            throw new AppError_1.default(403, "You do not have permission to perform this action.");
        }
        req.user = { id: user.id, email: user.email, role: user.role };
        next();
    });
};
exports.auth = auth;
