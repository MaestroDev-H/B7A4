"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGearValidation = exports.createGearValidation = void 0;
const zod_1 = require("zod");
exports.createGearValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).min(2),
        description: zod_1.z.string({ required_error: "Description is required" }).min(10),
        brand: zod_1.z.string({ required_error: "Brand is required" }),
        pricePerDay: zod_1.z.number({ required_error: "Price per day is required" }).positive(),
        stock: zod_1.z.number().int().nonnegative().default(1),
        images: zod_1.z.array(zod_1.z.string().url()).optional().default([]),
        categoryId: zod_1.z.string({ required_error: "Category is required" }),
    }),
});
exports.updateGearValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        description: zod_1.z.string().min(10).optional(),
        brand: zod_1.z.string().optional(),
        pricePerDay: zod_1.z.number().positive().optional(),
        stock: zod_1.z.number().int().nonnegative().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        images: zod_1.z.array(zod_1.z.string().url()).optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
