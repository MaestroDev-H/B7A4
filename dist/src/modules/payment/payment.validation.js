"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPaymentValidation = exports.createPaymentValidation = void 0;
const zod_1 = require("zod");
exports.createPaymentValidation = zod_1.z.object({
    body: zod_1.z.object({
        rentalOrderId: zod_1.z
            .string({
            required_error: "rentalOrderId is required",
            invalid_type_error: "rentalOrderId must be a string",
        })
            .trim()
            .uuid({ message: "Invalid rentalOrderId format. Must be a valid UUID" }),
    }),
});
exports.confirmPaymentValidation = zod_1.z.object({
    body: zod_1.z.object({
        transactionId: zod_1.z
            .string({
            required_error: "transactionId is required",
            invalid_type_error: "transactionId must be a string",
        })
            .trim()
            .min(1, { message: "transactionId cannot be empty" }),
    }),
});
