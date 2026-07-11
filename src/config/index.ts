import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT || 5000,
    jwt_secret: process.env.JWT_SECRET as string,
    jwt_expires_in: process.env.JWT_EXPIRES_IN || "7d",
    bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY as string,
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET as string,
    client_url: process.env.CLIENT_URL || "http://localhost:3000",
    node_env: process.env.NODE_ENV || "development",
};
