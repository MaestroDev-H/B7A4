"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validateRequest = (schema) => {
    return async (req, _res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                return next(err);
            }
            next(err);
        }
    };
};
exports.default = validateRequest;
