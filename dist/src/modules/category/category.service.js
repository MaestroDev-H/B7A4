"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const AppError_1 = __importDefault(require("../../utils/AppError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const createCategory = async (name) => {
    const existing = await prisma_1.default.category.findUnique({ where: { name } });
    if (existing)
        throw new AppError_1.default(409, "Category already exists.");
    return prisma_1.default.category.create({ data: { name } });
};
const getAllCategories = async () => {
    return prisma_1.default.category.findMany({ orderBy: { name: "asc" } });
};
const updateCategory = async (id, name) => {
    const category = await prisma_1.default.category.findUnique({ where: { id } });
    if (!category)
        throw new AppError_1.default(404, "Category not found.");
    return prisma_1.default.category.update({ where: { id }, data: { name } });
};
const deleteCategory = async (id) => {
    const category = await prisma_1.default.category.findUnique({ where: { id } });
    if (!category)
        throw new AppError_1.default(404, "Category not found.");
    return prisma_1.default.category.delete({ where: { id } });
};
exports.CategoryServices = { createCategory, getAllCategories, updateCategory, deleteCategory };
