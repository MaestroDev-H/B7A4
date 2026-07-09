"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rental_controller_1 = require("./rental.controller");
const rental_validation_1 = require("./rental.validation");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)("CUSTOMER"), (0, validateRequest_1.default)(rental_validation_1.createRentalValidation), rental_controller_1.RentalControllers.createRentalOrder);
router.get("/my-orders", (0, auth_1.auth)("CUSTOMER"), rental_controller_1.RentalControllers.getMyOrders);
router.get("/incoming", (0, auth_1.auth)("PROVIDER"), rental_controller_1.RentalControllers.getIncomingOrders);
router.get("/:id", (0, auth_1.auth)("CUSTOMER", "PROVIDER", "ADMIN"), rental_controller_1.RentalControllers.getOrderById);
router.patch("/:id/status", (0, auth_1.auth)("CUSTOMER", "PROVIDER"), (0, validateRequest_1.default)(rental_validation_1.updateRentalStatusValidation), rental_controller_1.RentalControllers.updateOrderStatus);
exports.RentalRoutes = router;
