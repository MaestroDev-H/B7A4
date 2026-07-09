"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GearControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const gear_service_1 = require("./gear.service");
const createGear = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearServices.createGear(req.user.id, req.body);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, message: "Gear item created successfully", data: result });
});
const getAllGear = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearServices.getAllGear(req.query);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Gear items fetched successfully", data: result });
});
const getGearById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearServices.getGearById(req.params.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Gear item fetched successfully", data: result });
});
const getMyGear = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearServices.getMyGear(req.user.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Your gear items fetched successfully", data: result });
});
const updateGear = (0, catchAsync_1.default)(async (req, res) => {
    const result = await gear_service_1.GearServices.updateGear(req.params.id, req.user.id, req.body);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Gear item updated successfully", data: result });
});
const deleteGear = (0, catchAsync_1.default)(async (req, res) => {
    await gear_service_1.GearServices.deleteGear(req.params.id, req.user.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Gear item deleted successfully", data: null });
});
exports.GearControllers = { createGear, getAllGear, getGearById, getMyGear, updateGear, deleteGear };
