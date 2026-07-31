import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
    const result = await AdminServices.getAllUsers();
    sendResponse(res, { statusCode: 200, success: true, message: "Users fetched successfully", data: result });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminServices.updateUserStatus(req.params.id, req.body.status);
    sendResponse(res, { statusCode: 200, success: true, message: "User status updated successfully", data: result });
});

const getAllGear = catchAsync(async (_req: Request, res: Response) => {
    const result = await AdminServices.getAllGearForAdmin();
    sendResponse(res, { statusCode: 200, success: true, message: "All gear items fetched successfully", data: result });
});

const getAllRentalOrders = catchAsync(async (_req: Request, res: Response) => {
    const result = await AdminServices.getAllRentalOrders();
    sendResponse(res, { statusCode: 200, success: true, message: "All rental orders fetched successfully", data: result });
});

export const AdminControllers = { getAllUsers, updateUserStatus, getAllGear, getAllRentalOrders };
