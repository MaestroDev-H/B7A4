import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";

const createReview = async (
    customerId: string,
    payload: { gearItemId: string; rating: number; comment?: string }
) => {
    // Customer may only review gear they actually rented and had RETURNED
    const eligibleOrderItem = await prisma.rentalOrderItem.findFirst({
        where: {
            gearItemId: payload.gearItemId,
            rentalOrder: { customerId, status: "RETURNED" },
        },
    });

    if (!eligibleOrderItem) {
        throw new AppError(403, "You can only review gear from an order you have returned.");
    }

    const existingReview = await prisma.review.findFirst({
        where: { customerId, gearItemId: payload.gearItemId },
    });
    if (existingReview) {
        throw new AppError(409, "You have already reviewed this gear item.");
    }

    return prisma.review.create({
        data: {
            customerId,
            gearItemId: payload.gearItemId,
            rating: payload.rating,
            comment: payload.comment,
        },
    });
};

const getReviewsForGear = async (gearItemId: string) => {
    return prisma.review.findMany({
        where: { gearItemId },
        include: { customer: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
};

export const ReviewServices = { createReview, getReviewsForGear };
