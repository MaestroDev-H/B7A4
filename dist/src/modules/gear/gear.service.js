"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createGear = async (providerId, payload) => {
    return prisma_1.default.gearItem.create({ data: { ...payload, providerId } });
};
const getAllGear = async (filters) => {
    const { search, category, brand, minPrice, maxPrice, available } = filters;
    const where = {
        isDeleted: false,
        ...(search && {
            OR: [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { brand: { contains: search, mode: "insensitive" } },
            ],
        }),
        ...(category && { categoryId: category }),
        ...(brand && { brand: { equals: brand, mode: "insensitive" } }),
        ...(available !== undefined && { isAvailable: available === "true" }),
        ...((minPrice || maxPrice) && {
            pricePerDay: {
                ...(minPrice && { gte: Number(minPrice) }),
                ...(maxPrice && { lte: Number(maxPrice) }),
            },
        }),
    };
    return prisma_1.default.gearItem.findMany({
        where,
        include: { category: true, provider: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
};
const getGearById = async (id) => {
    const gear = await prisma_1.default.gearItem.findFirst({
        where: { id, isDeleted: false },
        include: {
            category: true,
            provider: { select: { id: true, name: true, email: true } },
            reviews: { include: { customer: { select: { id: true, name: true } } } },
        },
    });
    if (!gear)
        throw new AppError_1.default(404, "Gear item not found.");
    return gear;
};
const getMyGear = async (providerId) => {
    return prisma_1.default.gearItem.findMany({
        where: { providerId, isDeleted: false },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });
};
const assertOwnership = async (gearId, providerId) => {
    const gear = await prisma_1.default.gearItem.findFirst({ where: { id: gearId, isDeleted: false } });
    if (!gear)
        throw new AppError_1.default(404, "Gear item not found.");
    if (gear.providerId !== providerId) {
        throw new AppError_1.default(403, "You can only manage your own gear items.");
    }
    return gear;
};
const updateGear = async (gearId, providerId, payload) => {
    await assertOwnership(gearId, providerId);
    return prisma_1.default.gearItem.update({ where: { id: gearId }, data: payload });
};
const deleteGear = async (gearId, providerId) => {
    await assertOwnership(gearId, providerId);
    return prisma_1.default.gearItem.update({ where: { id: gearId }, data: { isDeleted: true } });
};
exports.GearServices = { createGear, getAllGear, getGearById, getMyGear, updateGear, deleteGear };
