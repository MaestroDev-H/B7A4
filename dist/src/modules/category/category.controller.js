"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const category_service_1 = require("./category.service");
const createCategory = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryServices.createCategory(req.body.name);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, message: "Category created successfully", data: result });
});
const getAllCategories = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await category_service_1.CategoryServices.getAllCategories();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Categories fetched successfully", data: result });
});
const updateCategory = (0, catchAsync_1.default)(async (req, res) => {
    const result = await category_service_1.CategoryServices.updateCategory(req.params.id, req.body.name);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Category updated successfully", data: result });
});
const deleteCategory = (0, catchAsync_1.default)(async (req, res) => {
    await category_service_1.CategoryServices.deleteCategory(req.params.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Category deleted successfully", data: null });
});
exports.CategoryControllers = { createCategory, getAllCategories, updateCategory, deleteCategory };
