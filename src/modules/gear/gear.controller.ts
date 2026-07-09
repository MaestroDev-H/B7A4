import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { GearServices } from "./gear.service";

const createGear = catchAsync(async (req: Request, res: Response) => {
    const result = await GearServices.createGear(req.user!.id, req.body);
    sendResponse(res, { statusCode: 201, success: true, message: "Gear item created successfully", data: result });
});

const getAllGear = catchAsync(async (req: Request, res: Response) => {
    const result = await GearServices.getAllGear(req.query);
    sendResponse(res, { statusCode: 200, success: true, message: "Gear items fetched successfully", data: result });
});

const getGearById = catchAsync(async (req: Request, res: Response) => {
    const result = await GearServices.getGearById(req.params.id);
    sendResponse(res, { statusCode: 200, success: true, message: "Gear item fetched successfully", data: result });
});

const getMyGear = catchAsync(async (req: Request, res: Response) => {
    const result = await GearServices.getMyGear(req.user!.id);
    sendResponse(res, { statusCode: 200, success: true, message: "Your gear items fetched successfully", data: result });
});

const updateGear = catchAsync(async (req: Request, res: Response) => {
    const result = await GearServices.updateGear(req.params.id, req.user!.id, req.body);
    sendResponse(res, { statusCode: 200, success: true, message: "Gear item updated successfully", data: result });
});

const deleteGear = catchAsync(async (req: Request, res: Response) => {
    await GearServices.deleteGear(req.params.id, req.user!.id);
    sendResponse(res, { statusCode: 200, success: true, message: "Gear item deleted successfully", data: null });
});

export const GearControllers = { createGear, getAllGear, getGearById, getMyGear, updateGear, deleteGear };
