import { z } from "zod";

export const createRentalValidation = z.object({
    body: z.object({
        startDate: z.string({ required_error: "Start date is required" }).min(1),
        endDate: z.string({ required_error: "End date is required" }).min(1),
        items: z
            .array(
                z.object({
                    gearItemId: z.string({ required_error: "gearItemId is required" }),
                    quantity: z.number({ required_error: "quantity is required" }).int().positive(),
                })
            )
            .min(1, "At least one gear item is required"),
    }),
});

export const updateRentalStatusValidation = z.object({
    body: z.object({
        status: z.enum(["CONFIRMED", "PICKED_UP", "RETURNED", "CANCELLED"], {
            required_error: "status is required",
        }),
    }),
});
