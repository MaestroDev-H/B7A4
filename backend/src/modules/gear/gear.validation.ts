import { z } from "zod";

export const createGearValidation = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).min(2),
        description: z.string({ required_error: "Description is required" }).min(10),
        brand: z.string({ required_error: "Brand is required" }),
        pricePerDay: z.number({ required_error: "Price per day is required" }).positive(),
        stock: z.number().int().nonnegative().default(1),
        images: z.array(z.string().url()).optional().default([]),
        categoryId: z.string({ required_error: "Category is required" }),
    }),
});

export const updateGearValidation = z.object({
    body: z.object({
        name: z.string().min(2).optional(),
        description: z.string().min(10).optional(),
        brand: z.string().optional(),
        pricePerDay: z.number().positive().optional(),
        stock: z.number().int().nonnegative().optional(),
        isAvailable: z.boolean().optional(),
        images: z.array(z.string().url()).optional(),
        categoryId: z.string().optional(),
    }),
});
