import { z } from "zod";

export const createPaymentValidation = z.object({
    body: z.object({
        rentalOrderId: z.string({ required_error: "rentalOrderId is required" }),
    }),
});

export const confirmPaymentValidation = z.object({
    body: z.object({
        transactionId: z.string({ required_error: "transactionId is required" }),
    }),
});
