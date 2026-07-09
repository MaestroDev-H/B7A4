import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import config from "../../config";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";
import { signToken } from "../../utils/jwt";

const registerUser = async (payload: {
    name: string;
    email: string;
    password: string;
    role?: "CUSTOMER" | "PROVIDER";
}) => {
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
        throw new AppError(409, "A user with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(payload.password, config.bcrypt_salt_rounds);

    const user = await prisma.user.create({
        data: {
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role ?? Role.CUSTOMER, // self-registration can never create ADMIN
        },
        select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return { user, token };
};

const loginUser = async (payload: { email: string; password: string }) => {
    const user = await prisma.user.findUnique({ where: { email: payload.email } });

    if (!user) {
        throw new AppError(401, "Invalid email or password.");
    }

    if (user.status === "SUSPENDED") {
        throw new AppError(403, "Your account has been suspended.");
    }

    const passwordMatch = await bcrypt.compare(payload.password, user.password);
    if (!passwordMatch) {
        throw new AppError(401, "Invalid email or password.");
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    const { password: _pw, ...safeUser } = user;
    return { user: safeUser, token };
};

const getMe = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
    });
    if (!user) throw new AppError(404, "User not found.");
    return user;
};

export const AuthServices = { registerUser, loginUser, getMe };
