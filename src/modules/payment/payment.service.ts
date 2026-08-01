import Stripe from "stripe";
import config from "../../config";
import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";

const stripe = new Stripe(config.stripe_secret_key || "sk_test_placeholder", {
    apiVersion: "2024-06-20",
});

// Create a Stripe PaymentIntent for a rental order and store a PENDING Payment row
const createPaymentIntent = async (customerId: string, rentalOrderId: string) => {
    const order = await prisma.rentalOrder.findUnique({
        where: { id: rentalOrderId },
        include: { payment: true },
    });

    if (!order) throw new AppError(404, "Rental order not found.");
    if (order.customerId !== customerId) {
        throw new AppError(403, "You can only pay for your own orders.");
    }
    if (order.payment) {
        throw new AppError(409, "A payment already exists for this order.");
    }
    if (order.status !== "PLACED" && order.status !== "CONFIRMED") {
        throw new AppError(400, `Order is in ${order.status} state and cannot be paid for.`);
    }

    const amountInCents = Math.round(order.totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        metadata: { rentalOrderId: order.id, customerId },
    });

    const payment = await prisma.payment.create({
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
const confirmPayment = async (transactionId: string) => {
    const payment = await prisma.payment.findUnique({ where: { transactionId } });
    if (!payment) throw new AppError(404, "Payment record not found.");

    const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);

    if (paymentIntent.status !== "succeeded") {
        throw new AppError(400, `Payment not completed yet. Stripe status: ${paymentIntent.status}`);
    }

    const [updatedPayment] = await prisma.$transaction([
        prisma.payment.update({
            where: { transactionId },
            data: { status: "COMPLETED", paidAt: new Date() },
        }),
        prisma.rentalOrder.update({
            where: { id: payment.rentalOrderId },
            data: { status: "PAID" },
        }),
    ]);

    return updatedPayment;
};

const getMyPayments = async (customerId: string) => {
    return prisma.payment.findMany({
        where: { rentalOrder: { customerId } },
        include: { rentalOrder: true },
        orderBy: { createdAt: "desc" },
    });
};

const getPaymentById = async (id: string, requester: { id: string; role: string }) => {
    const payment = await prisma.payment.findUnique({
        where: { id },
        include: { rentalOrder: true },
    });
    if (!payment) throw new AppError(404, "Payment not found.");
    if (requester.role !== "ADMIN" && payment.rentalOrder.customerId !== requester.id) {
        throw new AppError(403, "You do not have access to this payment.");
    }
    return payment;
};

export const PaymentServices = { createPaymentIntent, confirmPayment, getMyPayments, getPaymentById };
