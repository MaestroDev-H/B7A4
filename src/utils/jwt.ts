import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../config";

export type TJwtPayload = {
    id: string;
    email: string;
    role: string;
};

/**
 * Signs a payload to generate a JWT.
 * Defaults to config.jwt_secret and config.jwt_expires_in.
 */
export const signToken = (
    payload: TJwtPayload,
    secret: Secret = config.jwt_secret,
    expiresIn: string | number = config.jwt_expires_in
): string => {
    return jwt.sign(payload, secret, {
        expiresIn,
    } as SignOptions);
};

/**
 * Verifies a JWT and extracts the payload.
 * Defaults to config.jwt_secret.
 */
export const verifyToken = (
    token: string,
    secret: Secret = config.jwt_secret
): TJwtPayload => {
    return jwt.verify(token, secret) as TJwtPayload;
};
