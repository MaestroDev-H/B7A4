"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const payment_controller_1 = require("./payment.controller");
const payment_validation_1 = require("./payment.validation");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.auth)("CUSTOMER"), (0, validateRequest_1.default)(payment_validation_1.createPaymentValidation), payment_controller_1.PaymentControllers.createPaymentIntent);
router.post("/confirm", (0, auth_1.auth)("CUSTOMER"), (0, validateRequest_1.default)(payment_validation_1.confirmPaymentValidation), payment_controller_1.PaymentControllers.confirmPayment);
router.get("/my-payments", (0, auth_1.auth)("CUSTOMER"), payment_controller_1.PaymentControllers.getMyPayments);
router.get("/:id", (0, auth_1.auth)("CUSTOMER", "ADMIN"), payment_controller_1.PaymentControllers.getPaymentById);
exports.PaymentRoutes = router;
