"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentServices = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../utils/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const stripe = new stripe_1.default(config_1.default.stripe_secret_key || "sk_test_placeholder", {
    apiVersion: "2024-06-20",
});
// Create a Stripe PaymentIntent for a rental order and store a PENDING Payment row
const createPaymentIntent = async (customerId, rentalOrderId) => {
    const order = await prisma_1.default.rentalOrder.findUnique({
        where: { id: rentalOrderId },
        include: { payment: true },
    });
    if (!order)
        throw new AppError_1.default(404, "Rental order not found.");
    if (order.customerId !== customerId) {
        throw new AppError_1.default(403, "You can only pay for your own orders.");
    }
    if (order.payment) {
        throw new AppError_1.default(409, "A payment already exists for this order.");
    }
    if (order.status !== "PLACED" && order.status !== "CONFIRMED") {
        throw new AppError_1.default(400, `Order is in ${order.status} state and cannot be paid for.`);
    }
    const amountInCents = Math.round(order.totalAmount * 100);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        metadata: { rentalOrderId: order.id, customerId },
    });
    const payment = await prisma_1.default.payment.create({
        data: {
            transactionId: paymentIntent.id,
            amount: order.totalAmount,
            method: "stripe",
            status: "PENDING",
            rentalOrderId: order.id,
        },
    });
    return { clientSecret: paymentIntent.client_secret, payment };
};
// Confirm payment (called after client-side confirmation, or via webhook)
const confirmPayment = async (transactionId) => {
    const payment = await prisma_1.default.payment.findUnique({ where: { transactionId } });
    if (!payment)
        throw new AppError_1.default(404, "Payment record not found.");
    const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
    if (paymentIntent.status !== "succeeded") {
        throw new AppError_1.default(400, `Payment not completed yet. Stripe status: ${paymentIntent.status}`);
    }
    const [updatedPayment] = await prisma_1.default.$transaction([
        prisma_1.default.payment.update({
            where: { transactionId },
            data: { status: "COMPLETED", paidAt: new Date() },
        }),
        prisma_1.default.rentalOrder.update({
            where: { id: payment.rentalOrderId },
            data: { status: "PAID" },
        }),
    ]);
    return updatedPayment;
};
const getMyPayments = async (customerId) => {
    return prisma_1.default.payment.findMany({
        where: { rentalOrder: { customerId } },
        include: { rentalOrder: true },
        orderBy: { createdAt: "desc" },
    });
};
const getPaymentById = async (id, requester) => {
    const payment = await prisma_1.default.payment.findUnique({
        where: { id },
        include: { rentalOrder: true },
    });
    if (!payment)
        throw new AppError_1.default(404, "Payment not found.");
    if (requester.role !== "ADMIN" && payment.rentalOrder.customerId !== requester.id) {
        throw new AppError_1.default(403, "You do not have access to this payment.");
    }
    return payment;
};
exports.PaymentServices = { createPaymentIntent, confirmPayment, getMyPayments, getPaymentById };
