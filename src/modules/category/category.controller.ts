import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryServices.createCategory(req.body.name);
    sendResponse(res, { statusCode: 201, success: true, message: "Category created successfully", data: result });
});

const getAllCategories = catchAsync(async (_req: Request, res: Response) => {
    const result = await CategoryServices.getAllCategories();
    sendResponse(res, { statusCode: 200, success: true, message: "Categories fetched successfully", data: result });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryServices.updateCategory(req.params.id, req.body.name);
    sendResponse(res, { statusCode: 200, success: true, message: "Category updated successfully", data: result });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    await CategoryServices.deleteCategory(req.params.id);
    sendResponse(res, { statusCode: 200, success: true, message: "Category deleted successfully", data: null });
});

export const CategoryControllers = { createCategory, getAllCategories, updateCategory, deleteCategory };
