import { z } from "zod";

export const createReviewValidation = z.object({
    body: z.object({
        gearItemId: z.string({ required_error: "gearItemId is required" }),
        rating: z.number({ required_error: "rating is required" }).int().min(1).max(5),
        comment: z.string().max(1000).optional(),
    }),
});
