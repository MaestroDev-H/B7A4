import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewServices.createReview(req.user!.id, req.body);
    sendResponse(res, { statusCode: 201, success: true, message: "Review submitted successfully", data: result });
});

const getReviewsForGear = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewServices.getReviewsForGear(req.params.gearItemId);
    sendResponse(res, { statusCode: 200, success: true, message: "Reviews fetched successfully", data: result });
});

export const ReviewControllers = { createReview, getReviewsForGear };
