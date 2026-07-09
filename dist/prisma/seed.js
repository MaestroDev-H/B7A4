"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const adminPassword = await bcrypt_1.default.hash("Admin123!", saltRounds);
    const providerPassword = await bcrypt_1.default.hash("Provider123!", saltRounds);
    const customerPassword = await bcrypt_1.default.hash("Customer123!", saltRounds);
    const admin = await prisma.user.upsert({
        where: { email: "admin@gearup.com" },
        update: {},
        create: {
            name: "GearUp Admin",
            email: "admin@gearup.com",
            password: adminPassword,
            role: client_1.Role.ADMIN,
        },
    });
    const provider = await prisma.user.upsert({
        where: { email: "provider@gearup.com" },
        update: {},
        create: {
            name: "Trail Gear Co",
            email: "provider@gearup.com",
            password: providerPassword,
            role: client_1.Role.PROVIDER,
        },
    });
    const customer = await prisma.user.upsert({
        where: { email: "customer@gearup.com" },
        update: {},
        create: {
            name: "Jane Customer",
            email: "customer@gearup.com",
            password: customerPassword,
            role: client_1.Role.CUSTOMER,
        },
    });
    const category = await prisma.category.upsert({
        where: { name: "Camping" },
        update: {},
        create: { name: "Camping" },
    });
    await prisma.gearItem.upsert({
        where: { id: "seed-gear-tent-1" },
        update: {},
        create: {
            id: "seed-gear-tent-1",
            name: "4-Person Tent",
            description: "Weatherproof 4-person camping tent.",
            brand: "TrailMaster",
            pricePerDay: 15,
            stock: 5,
            images: ["https://placehold.co/600x400"],
            categoryId: category.id,
            providerId: provider.id,
        },
    });
    console.log("Seed complete:");
    console.log({ admin: admin.email, provider: provider.email, customer: customer.email });
    console.log("Admin login -> email: admin@gearup.com | password: Admin123!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
