"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const getAllUsers = async () => {
    return prisma_1.default.user.findMany({
        select: { id: true, name: true, email: true, role: true, status: true, createdAt: true },
        orderBy: { createdAt: "desc" },
    });
};
const updateUserStatus = async (userId, status) => {
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user)
        throw new AppError_1.default(404, "User not found.");
    if (user.role === "ADMIN")
        throw new AppError_1.default(400, "Cannot change status of an admin account.");
    return prisma_1.default.user.update({
        where: { id: userId },
        data: { status },
        select: { id: true, name: true, email: true, role: true, status: true },
    });
};
const getAllGearForAdmin = async () => {
    return prisma_1.default.gearItem.findMany({
        include: { category: true, provider: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "desc" },
    });
};
const getAllRentalOrders = async () => {
    return prisma_1.default.rentalOrder.findMany({
        include: {
            customer: { select: { id: true, name: true, email: true } },
            items: { include: { gearItem: true } },
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
exports.AdminServices = { getAllUsers, updateUserStatus, getAllGearForAdmin, getAllRentalOrders };
