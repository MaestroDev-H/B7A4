import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AdminControllers } from "./admin.controller";
import { updateUserStatusValidation } from "./admin.validation";

const router = Router();

router.get("/users", auth("ADMIN"), AdminControllers.getAllUsers);
router.patch("/users/:id/status", auth("ADMIN"), validateRequest(updateUserStatusValidation), AdminControllers.updateUserStatus);
router.get("/gear", auth("ADMIN"), AdminControllers.getAllGear);
router.get("/rentals", auth("ADMIN"), AdminControllers.getAllRentalOrders);

export const AdminRoutes = router;
