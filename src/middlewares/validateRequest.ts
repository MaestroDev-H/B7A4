import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                return next(err);
            }
            next(err);
        }
    };
};

export default validateRequest;
