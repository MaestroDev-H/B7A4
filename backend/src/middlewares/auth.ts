import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { verifyToken } from "../utils/jwt";
import prisma from "../utils/prisma";

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; email: string; role: string };
        }
    }
}

export const auth = (...allowedRoles: string[]) => {
    return catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(401, "You are not authorized. Please log in.");
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = verifyToken(token);
        } catch (error) {
            throw new AppError(401, "You are not authorized. Please log in.");
        }

        // Fast role pre-filtering using token payload to avoid unnecessary DB queries
        if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
            throw new AppError(403, "You do not have permission to perform this action.");
        }

        // Retrieve only the required columns to minimize DB overhead
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, role: true, status: true },
        });

        if (!user) {
            throw new AppError(401, "User no longer exists.");
        }

        if (user.status === "SUSPENDED") {
            throw new AppError(403, "Your account has been suspended.");
        }

        // Final verification of role against the current database state
        if (allowedRoles.length && !allowedRoles.includes(user.role)) {
            throw new AppError(403, "You do not have permission to perform this action.");
        }

        req.user = { id: user.id, email: user.email, role: user.role };
        next();
    });
};
