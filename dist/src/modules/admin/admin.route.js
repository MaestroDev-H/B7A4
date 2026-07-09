"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const router = (0, express_1.Router)();
router.get("/users", (0, auth_1.auth)("ADMIN"), admin_controller_1.AdminControllers.getAllUsers);
router.patch("/users/:id/status", (0, auth_1.auth)("ADMIN"), (0, validateRequest_1.default)(admin_validation_1.updateUserStatusValidation), admin_controller_1.AdminControllers.updateUserStatus);
router.get("/gear", (0, auth_1.auth)("ADMIN"), admin_controller_1.AdminControllers.getAllGear);
router.get("/rentals", (0, auth_1.auth)("ADMIN"), admin_controller_1.AdminControllers.getAllRentalOrders);
exports.AdminRoutes = router;
