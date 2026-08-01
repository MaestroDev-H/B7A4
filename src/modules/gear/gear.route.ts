import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { GearControllers } from "./gear.controller";
import { createGearValidation, updateGearValidation } from "./gear.validation";

const router = Router();

router.get("/", GearControllers.getAllGear);
router.get("/my-gear", auth("PROVIDER"), GearControllers.getMyGear);
router.get("/:id", GearControllers.getGearById);
router.post("/", auth("PROVIDER"), validateRequest(createGearValidation), GearControllers.createGear);
router.patch("/:id", auth("PROVIDER"), validateRequest(updateGearValidation), GearControllers.updateGear);
router.delete("/:id", auth("PROVIDER"), GearControllers.deleteGear);

export const GearRoutes = router;
