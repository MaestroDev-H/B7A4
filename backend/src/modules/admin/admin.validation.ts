import { z } from "zod";

export const updateUserStatusValidation = z.object({
    body: z.object({
        status: z.enum(["ACTIVE", "SUSPENDED"], { required_error: "status is required" }),
    }),
});
