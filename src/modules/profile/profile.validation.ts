import { z } from "zod";

export const updateCustomerProfileSchema = z.object({
    body: z.object({
        fullName: z.string().optional(),
        phone: z.string().optional(),
        shippingAddress: z.string().optional(),
        avatar: z.string().url().optional().or(z.literal("")),
    }),
});

export const updateProviderProfileSchema = z.object({
    body: z.object({
        businessName: z.string().optional(),
        storeDescription: z.string().optional(),
        contactEmail: z.string().email().optional().or(z.literal("")),
        phone: z.string().optional(),
        address: z.string().optional(),
        taxId: z.string().optional(),
        payoutAccount: z.string().optional(),
        logo: z.string().url().optional().or(z.literal("")),
    }),
});

export const ProfileValidations = {
    updateCustomerProfileSchema,
    updateProviderProfileSchema,
};
