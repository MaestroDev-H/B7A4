import { z } from "zod";

export const createCategoryValidation = z.object({
    body: z.object({
        name: z.string({ required_error: "Category name is required" }).min(2),
    }),
});

export const updateCategoryValidation = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
    }),
});
