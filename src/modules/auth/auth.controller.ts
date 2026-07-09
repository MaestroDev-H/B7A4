import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.registerUser(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: result,
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logged in successfully",
        data: result,
    });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.getMe(req.user!.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Current user fetched successfully",
        data: result,
    });
});

export const AuthControllers = { register, login, getMe };
