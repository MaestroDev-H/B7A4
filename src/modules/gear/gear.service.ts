import { Prisma } from "@prisma/client";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";

const createGear = async (providerId: string, payload: Prisma.GearItemUncheckedCreateInput) => {
    return prisma.gearItem.create({ data: { ...payload, providerId } });
};

type TGearFilters = {
    search?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    available?: string;
};

const getAllGear = async (filters: TGearFilters) => {
    const { search, category, brand, minPrice, maxPrice, available } = filters;

    const where: Prisma.GearItemWhereInput = {
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

    return prisma.gearItem.findMany({
        where,
        include: { category: true, provider: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
};

const getGearById = async (id: string) => {
    const gear = await prisma.gearItem.findFirst({
        where: { id, isDeleted: false },
        include: {
            category: true,
            provider: { select: { id: true, name: true, email: true } },
            reviews: { include: { customer: { select: { id: true, name: true } } } },
        },
    });
    if (!gear) throw new AppError(404, "Gear item not found.");
    return gear;
};

const getMyGear = async (providerId: string) => {
    return prisma.gearItem.findMany({
        where: { providerId, isDeleted: false },
        include: { category: true },
        orderBy: { createdAt: "desc" },
    });
};

const assertOwnership = async (gearId: string, providerId: string) => {
    const gear = await prisma.gearItem.findFirst({ where: { id: gearId, isDeleted: false } });
    if (!gear) throw new AppError(404, "Gear item not found.");
    if (gear.providerId !== providerId) {
        throw new AppError(403, "You can only manage your own gear items.");
    }
    return gear;
};

const updateGear = async (gearId: string, providerId: string, payload: Prisma.GearItemUpdateInput) => {
    await assertOwnership(gearId, providerId);
    return prisma.gearItem.update({ where: { id: gearId }, data: payload });
};

const deleteGear = async (gearId: string, providerId: string) => {
    await assertOwnership(gearId, providerId);
    return prisma.gearItem.update({ where: { id: gearId }, data: { isDeleted: true } });
};

export const GearServices = { createGear, getAllGear, getGearById, getMyGear, updateGear, deleteGear };
