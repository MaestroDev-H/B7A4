import { RentalStatus } from "@prisma/client";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";

type TCreateRentalPayload = {
    startDate: string;
    endDate: string;
    items: { gearItemId: string; quantity: number }[];
};

const createRentalOrder = async (customerId: string, payload: TCreateRentalPayload) => {
    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new AppError(400, "Invalid start or end date.");
    }
    if (endDate <= startDate) {
        throw new AppError(400, "endDate must be after startDate.");
    }

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    return prisma.$transaction(async (tx) => {
        let totalAmount = 0;
        const orderItemsData = [];

        for (const item of payload.items) {
            const gear = await tx.gearItem.findFirst({ where: { id: item.gearItemId, isDeleted: false } });
            if (!gear) throw new AppError(404, `Gear item ${item.gearItemId} not found.`);
            if (!gear.isAvailable) throw new AppError(400, `"${gear.name}" is not currently available.`);
            if (gear.stock < item.quantity) {
                throw new AppError(400, `Only ${gear.stock} unit(s) of "${gear.name}" available.`);
            }

            totalAmount += gear.pricePerDay * item.quantity * days;
            orderItemsData.push({
                gearItemId: gear.id,
                quantity: item.quantity,
                pricePerDay: gear.pricePerDay,
            });

            await tx.gearItem.update({
                where: { id: gear.id },
                data: { stock: gear.stock - item.quantity },
            });
        }

        const order = await tx.rentalOrder.create({
            data: {
                customerId,
                startDate,
                endDate,
                totalAmount,
                items: { create: orderItemsData },
            },
            include: { items: { include: { gearItem: true } } },
        });

        return order;
    });
};

const getMyOrders = async (customerId: string) => {
    return prisma.rentalOrder.findMany({
        where: { customerId },
        include: { items: { include: { gearItem: true } }, payment: true },
        orderBy: { createdAt: "desc" },
    });
};

const getIncomingOrdersForProvider = async (providerId: string) => {
    return prisma.rentalOrder.findMany({
        where: { items: { some: { gearItem: { providerId } } } },
        include: {
            customer: { select: { id: true, name: true, email: true } },
            items: { include: { gearItem: true } },
            payment: true,
        },
        orderBy: { createdAt: "desc" },
    });
};

const getOrderById = async (orderId: string, requester: { id: string; role: string }) => {
    const order = await prisma.rentalOrder.findUnique({
        where: { id: orderId },
        include: {
            items: { include: { gearItem: true } },
            payment: true,
            customer: { select: { id: true, name: true, email: true } },
        },
    });
    if (!order) throw new AppError(404, "Rental order not found.");

    const isOwner = order.customerId === requester.id;
    const isProviderOfAnyItem = order.items.some((i) => i.gearItem.providerId === requester.id);

    if (requester.role !== "ADMIN" && !isOwner && !isProviderOfAnyItem) {
        throw new AppError(403, "You do not have access to this order.");
    }

    return order;
};

const VALID_TRANSITIONS: Record<RentalStatus, RentalStatus[]> = {
    PLACED: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PAID", "CANCELLED"],
    PAID: ["PICKED_UP", "CANCELLED"],
    PICKED_UP: ["RETURNED"],
    RETURNED: [],
    CANCELLED: [],
};

const updateOrderStatus = async (
    orderId: string,
    requester: { id: string; role: string },
    nextStatus: RentalStatus
) => {
    const order = await prisma.rentalOrder.findUnique({
        where: { id: orderId },
        include: { items: { include: { gearItem: true } } },
    });
    if (!order) throw new AppError(404, "Rental order not found.");

    const isProviderOfAnyItem = order.items.some((i) => i.gearItem.providerId === requester.id);
    const isOwner = order.customerId === requester.id;

    if (requester.role === "CUSTOMER" && !(isOwner && nextStatus === "CANCELLED")) {
        throw new AppError(403, "Customers may only cancel their own orders.");
    }
    if (requester.role === "PROVIDER" && !isProviderOfAnyItem) {
        throw new AppError(403, "You do not manage gear on this order.");
    }

    const allowed = VALID_TRANSITIONS[order.status];
    if (!allowed.includes(nextStatus)) {
        throw new AppError(400, `Cannot move order from ${order.status} to ${nextStatus}.`);
    }

    if (nextStatus === "CANCELLED") {
        await prisma.$transaction(async (tx) => {
            for (const item of order.items) {
                await tx.gearItem.update({
                    where: { id: item.gearItemId },
                    data: { stock: { increment: item.quantity } },
                });
            }
            await tx.rentalOrder.update({ where: { id: orderId }, data: { status: "CANCELLED" } });
        });
        return prisma.rentalOrder.findUnique({ where: { id: orderId } });
    }

    return prisma.rentalOrder.update({ where: { id: orderId }, data: { status: nextStatus } });
};

export const RentalServices = {
    createRentalOrder,
    getMyOrders,
    getIncomingOrdersForProvider,
    getOrderById,
    updateOrderStatus,
};
