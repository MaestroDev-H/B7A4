"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryValidation = exports.createCategoryValidation = void 0;
const zod_1 = require("zod");
exports.createCategoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Category name is required" }).min(2),
    }),
});
exports.updateCategoryValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
    }),
});
