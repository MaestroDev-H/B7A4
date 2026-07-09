"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const getAllUsers = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await admin_service_1.AdminServices.getAllUsers();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Users fetched successfully", data: result });
});
const updateUserStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminServices.updateUserStatus(req.params.id, req.body.status);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "User status updated successfully", data: result });
});
const getAllGear = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await admin_service_1.AdminServices.getAllGearForAdmin();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "All gear items fetched successfully", data: result });
});
const getAllRentalOrders = (0, catchAsync_1.default)(async (_req, res) => {
    const result = await admin_service_1.AdminServices.getAllRentalOrders();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "All rental orders fetched successfully", data: result });
});
exports.AdminControllers = { getAllUsers, updateUserStatus, getAllGear, getAllRentalOrders };
