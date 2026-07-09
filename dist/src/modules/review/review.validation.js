"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewValidation = void 0;
const zod_1 = require("zod");
exports.createReviewValidation = zod_1.z.object({
    body: zod_1.z.object({
        gearItemId: zod_1.z.string({ required_error: "gearItemId is required" }),
        rating: zod_1.z.number({ required_error: "rating is required" }).int().min(1).max(5),
        comment: zod_1.z.string().max(1000).optional(),
    }),
});
