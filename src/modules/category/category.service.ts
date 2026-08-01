import AppError from "../../utils/AppError";
import prisma from "../../utils/prisma";

const createCategory = async (name: string) => {
    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) throw new AppError(409, "Category already exists.");
    return prisma.category.create({ data: { name } });
};

const getAllCategories = async () => {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
};

const updateCategory = async (id: string, name: string) => {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new AppError(404, "Category not found.");
    return prisma.category.update({ where: { id }, data: { name } });
};

const deleteCategory = async (id: string) => {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) throw new AppError(404, "Category not found.");
    return prisma.category.delete({ where: { id } });
};

export const CategoryServices = { createCategory, getAllCategories, updateCategory, deleteCategory };
