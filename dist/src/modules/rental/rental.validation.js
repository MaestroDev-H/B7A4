"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRentalStatusValidation = exports.createRentalValidation = void 0;
const zod_1 = require("zod");
exports.createRentalValidation = zod_1.z.object({
    body: zod_1.z.object({
        startDate: zod_1.z.string({ required_error: "Start date is required" }).min(1),
        endDate: zod_1.z.string({ required_error: "End date is required" }).min(1),
        items: zod_1.z
            .array(zod_1.z.object({
            gearItemId: zod_1.z.string({ required_error: "gearItemId is required" }),
            quantity: zod_1.z.number({ required_error: "quantity is required" }).int().positive(),
        }))
            .min(1, "At least one gear item is required"),
    }),
});
exports.updateRentalStatusValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["CONFIRMED", "PICKED_UP", "RETURNED", "CANCELLED"], {
            required_error: "status is required",
        }),
    }),
});
