import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";

const getMyProfile = async (userId: string, role: string) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            customerProfile: true,
            providerProfile: true,
        },
    });

    if (!user) {
        throw new AppError(404, "User profile not found.");
    }

    if (role === "CUSTOMER") {
        let profile = user.customerProfile;
        if (!profile) {
            profile = await prisma.customerProfile.create({
                data: { userId, fullName: user.name },
            });
        }
        return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, profile };
    }

    if (role === "PROVIDER") {
        let profile = user.providerProfile;
        if (!profile) {
            profile = await prisma.providerProfile.create({
                data: { userId, businessName: user.name, contactEmail: user.email },
            });
        }
        return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, profile };
    }

    return { user };
};

const updateCustomerProfile = async (
    userId: string,
    payload: { fullName?: string; phone?: string; shippingAddress?: string; avatar?: string }
) => {
    const existing = await prisma.customerProfile.findUnique({ where: { userId } });

    if (!existing) {
        return prisma.customerProfile.create({
            data: {
                userId,
                ...payload,
            },
        });
    }

    return prisma.customerProfile.update({
        where: { userId },
        data: payload,
    });
};

const updateProviderProfile = async (
    userId: string,
    payload: {
        businessName?: string;
        storeDescription?: string;
        contactEmail?: string;
        phone?: string;
        address?: string;
        taxId?: string;
        payoutAccount?: string;
        logo?: string;
    }
) => {
    const existing = await prisma.providerProfile.findUnique({ where: { userId } });

    if (!existing) {
        return prisma.providerProfile.create({
            data: {
                userId,
                ...payload,
            },
        });
    }

    return prisma.providerProfile.update({
        where: { userId },
        data: payload,
    });
};

export const ProfileServices = {
    getMyProfile,
    updateCustomerProfile,
    updateProviderProfile,
};
