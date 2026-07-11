"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const zod_1 = require("zod");
// Load environment variables
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    JWT_SECRET: zod_1.z.string({ required_error: "JWT_SECRET is required" }),
    JWT_EXPIRES_IN: zod_1.z.string().default("7d"),
    BCRYPT_SALT_ROUNDS: zod_1.z.coerce.number().default(12),
    STRIPE_SECRET_KEY: zod_1.z.string({ required_error: "STRIPE_SECRET_KEY is required" }),
    STRIPE_WEBHOOK_SECRET: zod_1.z.string({ required_error: "STRIPE_WEBHOOK_SECRET is required" }),
    CLIENT_URL: zod_1.z.string().default("http://localhost:3000"),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌ Environment validation failed:", parsed.error.format());
    throw new Error("Missing or invalid environment configurations.");
}
exports.default = {
    port: parsed.data.PORT,
    jwt_secret: parsed.data.JWT_SECRET,
    jwt_expires_in: parsed.data.JWT_EXPIRES_IN,
    bcrypt_salt_rounds: parsed.data.BCRYPT_SALT_ROUNDS,
    stripe_secret_key: parsed.data.STRIPE_SECRET_KEY,
    stripe_webhook_secret: parsed.data.STRIPE_WEBHOOK_SECRET,
    client_url: parsed.data.CLIENT_URL,
    node_env: parsed.data.NODE_ENV,
};
