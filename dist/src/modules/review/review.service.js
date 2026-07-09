"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createReview = async (customerId, payload) => {
    // Customer may only review gear they actually rented and had RETURNED
    const eligibleOrderItem = await prisma_1.default.rentalOrderItem.findFirst({
        where: {
            gearItemId: payload.gearItemId,
            rentalOrder: { customerId, status: "RETURNED" },
        },
    });
    if (!eligibleOrderItem) {
        throw new AppError_1.default(403, "You can only review gear from an order you have returned.");
    }
    const existingReview = await prisma_1.default.review.findFirst({
        where: { customerId, gearItemId: payload.gearItemId },
    });
    if (existingReview) {
        throw new AppError_1.default(409, "You have already reviewed this gear item.");
    }
    return prisma_1.default.review.create({
        data: {
            customerId,
            gearItemId: payload.gearItemId,
            rating: payload.rating,
            comment: payload.comment,
        },
    });
};
const getReviewsForGear = async (gearItemId) => {
    return prisma_1.default.review.findMany({
        where: { gearItemId },
        include: { customer: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
    });
};
exports.ReviewServices = { createReview, getReviewsForGear };
