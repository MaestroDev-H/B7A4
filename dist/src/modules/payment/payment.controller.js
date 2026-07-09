"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const payment_service_1 = require("./payment.service");
const createPaymentIntent = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentServices.createPaymentIntent(req.user.id, req.body.rentalOrderId);
    (0, sendResponse_1.default)(res, { statusCode: 201, success: true, message: "Payment intent created successfully", data: result });
});
const confirmPayment = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentServices.confirmPayment(req.body.transactionId);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Payment confirmed successfully", data: result });
});
const getMyPayments = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentServices.getMyPayments(req.user.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Payments fetched successfully", data: result });
});
const getPaymentById = (0, catchAsync_1.default)(async (req, res) => {
    const result = await payment_service_1.PaymentServices.getPaymentById(req.params.id, req.user);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: "Payment fetched successfully", data: result });
});
exports.PaymentControllers = { createPaymentIntent, confirmPayment, getMyPayments, getPaymentById };
