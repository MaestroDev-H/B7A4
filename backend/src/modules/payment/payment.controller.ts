import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentServices.createPaymentIntent(req.user!.id, req.body.rentalOrderId);
    sendResponse(res, { statusCode: 201, success: true, message: "Payment intent created successfully", data: result });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentServices.confirmPayment(req.body.transactionId);
    sendResponse(res, { statusCode: 200, success: true, message: "Payment confirmed successfully", data: result });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentServices.getMyPayments(req.user!.id);
    sendResponse(res, { statusCode: 200, success: true, message: "Payments fetched successfully", data: result });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentServices.getPaymentById(req.params.id, req.user!);
    sendResponse(res, { statusCode: 200, success: true, message: "Payment fetched successfully", data: result });
});

export const PaymentControllers = { createPaymentIntent, confirmPayment, getMyPayments, getPaymentById };
