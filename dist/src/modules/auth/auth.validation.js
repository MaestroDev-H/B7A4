"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const zod_1 = require("zod");
exports.registerValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).min(2),
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email"),
        password: zod_1.z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters"),
        role: zod_1.z.enum(["CUSTOMER", "PROVIDER"]).optional(),
    }),
});
exports.loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email"),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
