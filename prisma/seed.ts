import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;

    const adminPassword = await bcrypt.hash("Admin123!", saltRounds);
    const providerPassword = await bcrypt.hash("Provider123!", saltRounds);
    const customerPassword = await bcrypt.hash("Customer123!", saltRounds);

    const admin = await prisma.user.upsert({
        where: { email: "admin@gearup.com" },
        update: {},
        create: {
            name: "GearUp Admin",
            email: "admin@gearup.com",
            password: adminPassword,
            role: Role.ADMIN,
        },
    });

    const provider = await prisma.user.upsert({
        where: { email: "provider@gearup.com" },
        update: {},
        create: {
            name: "Trail Gear Co",
            email: "provider@gearup.com",
            password: providerPassword,
            role: Role.PROVIDER,
        },
    });

    const customer = await prisma.user.upsert({
        where: { email: "customer@gearup.com" },
        update: {},
        create: {
            name: "Jane Customer",
            email: "customer@gearup.com",
            password: customerPassword,
            role: Role.CUSTOMER,
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
