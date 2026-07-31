import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails: unknown = err;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err.errorDetails ?? null;
    } else if (err instanceof ZodError) {
        statusCode = 400;
        message = "Validation error";
        errorDetails = err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
        }));
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 400;
        if (err.code === "P2002") {
            message = `Duplicate value for field: ${(err.meta?.target as string[])?.join(", ")}`;
        } else if (err.code === "P2025") {
            statusCode = 404;
            message = "Requested resource was not found.";
        } else {
            message = "Database request error.";
        }
        errorDetails = err.meta ?? null;
    } else if (err instanceof Error) {
        message = err.message;
        errorDetails = process.env.NODE_ENV === "production" ? null : err.stack;
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorDetails,
    });
};

export default globalErrorHandler;
