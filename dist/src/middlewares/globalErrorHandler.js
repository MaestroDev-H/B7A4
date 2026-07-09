"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../utils/AppError"));
const globalErrorHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = err;
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err.errorDetails ?? null;
    }
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = "Validation error";
        errorDetails = err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
    }
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        statusCode = 400;
        if (err.code === "P2002") {
            message = `Duplicate value for field: ${err.meta?.target?.join(", ")}`;
        }
        else if (err.code === "P2025") {
            statusCode = 404;
            message = "Requested resource was not found.";
        }
        else {
            message = "Database request error.";
        }
        errorDetails = err.meta ?? null;
    }
    else if (err instanceof Error) {
        message = err.message;
        errorDetails = process.env.NODE_ENV === "production" ? null : err.stack;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
    });
};
exports.default = globalErrorHandler;
