import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config";

export type TJwtPayload = {
    id: string;
    email: string;
    role: string;
};

export const signToken = (payload: TJwtPayload): string => {
    return jwt.sign(payload, config.jwt_secret, {
        expiresIn: config.jwt_expires_in,
    } as SignOptions);
};

export const verifyToken = (token: string): TJwtPayload => {
    return jwt.verify(token, config.jwt_secret) as TJwtPayload;
};
