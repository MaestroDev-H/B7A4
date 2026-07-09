import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewControllers } from "./review.controller";
import { createReviewValidation } from "./review.validation";

const router = Router();

router.post("/", auth("CUSTOMER"), validateRequest(createReviewValidation), ReviewControllers.createReview);
router.get("/gear/:gearItemId", ReviewControllers.getReviewsForGear);

export const ReviewRoutes = router;
