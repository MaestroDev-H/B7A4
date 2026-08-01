import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalServices } from "./rental.service";

const createRentalOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await RentalServices.createRentalOrder(req.user!.id, req.body);
    sendResponse(res, { statusCode: 201, success: true, message: "Rental order placed successfully", data: result });
});

const getMyOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await RentalServices.getMyOrders(req.user!.id);
    sendResponse(res, { statusCode: 200, success: true, message: "Your rental orders fetched successfully", data: result });
});

const getIncomingOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await RentalServices.getIncomingOrdersForProvider(req.user!.id);
    sendResponse(res, { statusCode: 200, success: true, message: "Incoming orders fetched successfully", data: result });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
    const result = await RentalServices.getOrderById(req.params.id, req.user!);
    sendResponse(res, { statusCode: 200, success: true, message: "Rental order fetched successfully", data: result });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await RentalServices.updateOrderStatus(req.params.id, req.user!, req.body.status);
    sendResponse(res, { statusCode: 200, success: true, message: "Rental order status updated successfully", data: result });
});

export const RentalControllers = {
    createRentalOrder,
    getMyOrders,
    getIncomingOrders,
    getOrderById,
    updateOrderStatus,
};
