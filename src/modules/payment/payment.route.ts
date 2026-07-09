import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PaymentControllers } from "./payment.controller";
import { confirmPaymentValidation, createPaymentValidation } from "./payment.validation";

const router = Router();

router.post("/create", auth("CUSTOMER"), validateRequest(createPaymentValidation), PaymentControllers.createPaymentIntent);
router.post("/confirm", auth("CUSTOMER"), validateRequest(confirmPaymentValidation), PaymentControllers.confirmPayment);
router.get("/my-payments", auth("CUSTOMER"), PaymentControllers.getMyPayments);
router.get("/:id", auth("CUSTOMER", "ADMIN"), PaymentControllers.getPaymentById);

export const PaymentRoutes = router;
