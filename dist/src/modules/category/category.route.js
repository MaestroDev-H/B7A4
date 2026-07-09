"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.CategoryControllers.getAllCategories);
router.post("/", (0, auth_1.auth)("ADMIN"), (0, validateRequest_1.default)(category_validation_1.createCategoryValidation), category_controller_1.CategoryControllers.createCategory);
router.patch("/:id", (0, auth_1.auth)("ADMIN"), (0, validateRequest_1.default)(category_validation_1.updateCategoryValidation), category_controller_1.CategoryControllers.updateCategory);
router.delete("/:id", (0, auth_1.auth)("ADMIN"), category_controller_1.CategoryControllers.deleteCategory);
exports.CategoryRoutes = router;
