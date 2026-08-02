import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProfileServices } from "./profile.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req.user!;
    const result = await ProfileServices.getMyProfile(user.id, user.role);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile retrieved successfully",
        data: result,
    });
});

const updateCustomerProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const result = await ProfileServices.updateCustomerProfile(userId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Customer profile updated successfully",
        data: result,
    });
});

const updateProviderProfile = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const result = await ProfileServices.updateProviderProfile(userId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Provider profile updated successfully",
        data: result,
    });
});

export const ProfileControllers = {
    getMyProfile,
    updateCustomerProfile,
    updateProviderProfile,
};
