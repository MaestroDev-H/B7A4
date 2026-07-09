"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const rental_service_1 = require("./rental.service");
const createRentalOrder = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalServices.createRentalOrder(req.user.id, req.body);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, message: "Rental order placed successfully", data: result });
});
const getMyOrders = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalServices.getMyOrders(req.user.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Your rental orders fetched successfully", data: result });
});
const getIncomingOrders = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalServices.getIncomingOrdersForProvider(req.user.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Incoming orders fetched successfully", data: result });
});
const getOrderById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalServices.getOrderById(req.params.id, req.user);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Rental order fetched successfully", data: result });
});
const updateOrderStatus = (0, catchAsync_1.default)(async (req, res) => {
    const result = await rental_service_1.RentalServices.updateOrderStatus(req.params.id, req.user, req.body.status);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Rental order status updated successfully", data: result });
});
exports.RentalControllers = {
    createRentalOrder,
    getMyOrders,
    getIncomingOrders,
    getOrderById,
    updateOrderStatus,
};
