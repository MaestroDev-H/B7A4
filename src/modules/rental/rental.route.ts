import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RentalControllers } from "./rental.controller";
import { createRentalValidation, updateRentalStatusValidation } from "./rental.validation";

const router = Router();

router.post("/", auth("CUSTOMER"), validateRequest(createRentalValidation), RentalControllers.createRentalOrder);
router.get("/my-orders", auth("CUSTOMER"), RentalControllers.getMyOrders);
router.get("/incoming", auth("PROVIDER"), RentalControllers.getIncomingOrders);
router.get("/:id", auth("CUSTOMER", "PROVIDER", "ADMIN"), RentalControllers.getOrderById);
router.patch(
    "/:id/status",
    auth("CUSTOMER", "PROVIDER"),
    validateRequest(updateRentalStatusValidation),
    RentalControllers.updateOrderStatus
);

export const RentalRoutes = router;
