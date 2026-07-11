import { z } from "zod";

export const createPaymentValidation = z.object({
    body: z.object({
        rentalOrderId: z
            .string({
                required_error: "rentalOrderId is required",
                invalid_type_error: "rentalOrderId must be a string",
            })
            .trim()
            .uuid({ message: "Invalid rentalOrderId format. Must be a valid UUID" }),
    }),
});

export const confirmPaymentValidation = z.object({
    body: z.object({
        transactionId: z
            .string({
                required_error: "transactionId is required",
                invalid_type_error: "transactionId must be a string",
            })
            .trim()
            .min(1, { message: "transactionId cannot be empty" }),
    }),
});
