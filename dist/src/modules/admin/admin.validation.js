"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatusValidation = void 0;
const zod_1 = require("zod");
exports.updateUserStatusValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["ACTIVE", "SUSPENDED"], { required_error: "status is required" }),
    }),
});
