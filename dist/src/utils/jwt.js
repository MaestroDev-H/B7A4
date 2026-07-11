"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
/**
 * Signs a payload to generate a JWT.
 * Defaults to config.jwt_secret and config.jwt_expires_in.
 */
const signToken = (payload, secret = config_1.default.jwt_secret, expiresIn = config_1.default.jwt_expires_in) => {
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn,
    });
};
exports.signToken = signToken;
/**
 * Verifies a JWT and extracts the payload.
 * Defaults to config.jwt_secret.
 */
const verifyToken = (token, secret = config_1.default.jwt_secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
