import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env") });

const envSchema = z.object({
    PORT: z.coerce.number().default(5000),
    JWT_SECRET: z.string({ required_error: "JWT_SECRET is required" }),
    JWT_EXPIRES_IN: z.string().default("7d"),
    BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),
    STRIPE_SECRET_KEY: z.string({ required_error: "STRIPE_SECRET_KEY is required" }),
    STRIPE_WEBHOOK_SECRET: z.string({ required_error: "STRIPE_WEBHOOK_SECRET is required" }),
    CLIENT_URL: z.string().default("http://localhost:3000"),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Environment validation failed:", parsed.error.format());
    throw new Error("Missing or invalid environment configurations.");
}

export default {
    port: parsed.data.PORT,
    jwt_secret: parsed.data.JWT_SECRET,
    jwt_expires_in: parsed.data.JWT_EXPIRES_IN,
    bcrypt_salt_rounds: parsed.data.BCRYPT_SALT_ROUNDS,
    stripe_secret_key: parsed.data.STRIPE_SECRET_KEY,
    stripe_webhook_secret: parsed.data.STRIPE_WEBHOOK_SECRET,
    client_url: parsed.data.CLIENT_URL,
    node_env: parsed.data.NODE_ENV,
};
