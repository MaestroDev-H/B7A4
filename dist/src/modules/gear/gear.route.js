"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const gear_controller_1 = require("./gear.controller");
const gear_validation_1 = require("./gear.validation");
const router = (0, express_1.Router)();
router.get("/", gear_controller_1.GearControllers.getAllGear);
router.get("/my-gear", (0, auth_1.auth)("PROVIDER"), gear_controller_1.GearControllers.getMyGear);
router.get("/:id", gear_controller_1.GearControllers.getGearById);
router.post("/", (0, auth_1.auth)("PROVIDER"), (0, validateRequest_1.default)(gear_validation_1.createGearValidation), gear_controller_1.GearControllers.createGear);
router.patch("/:id", (0, auth_1.auth)("PROVIDER"), (0, validateRequest_1.default)(gear_validation_1.updateGearValidation), gear_controller_1.GearControllers.updateGear);
router.delete("/:id", (0, auth_1.auth)("PROVIDER"), gear_controller_1.GearControllers.deleteGear);
exports.GearRoutes = router;
