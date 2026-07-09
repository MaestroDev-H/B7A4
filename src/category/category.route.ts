import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryControllers } from "./category.controller";
import { createCategoryValidation, updateCategoryValidation } from "./category.validation";

const router = Router();

router.get("/", CategoryControllers.getAllCategories);
router.post("/", auth("ADMIN"), validateRequest(createCategoryValidation), CategoryControllers.createCategory);
router.patch("/:id", auth("ADMIN"), validateRequest(updateCategoryValidation), CategoryControllers.updateCategory);
router.delete("/:id", auth("ADMIN"), CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
