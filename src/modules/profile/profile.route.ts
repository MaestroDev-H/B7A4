import { Router } from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ProfileControllers } from "./profile.controller";
import { ProfileValidations } from "./profile.validation";

const router = Router();

router.get("/me", auth("CUSTOMER", "PROVIDER", "ADMIN"), ProfileControllers.getMyProfile);

router.patch(
    "/customer",
    auth("CUSTOMER"),
    validateRequest(ProfileValidations.updateCustomerProfileSchema),
    ProfileControllers.updateCustomerProfile
);

router.patch(
    "/provider",
    auth("PROVIDER"),
    validateRequest(ProfileValidations.updateProviderProfileSchema),
    ProfileControllers.updateProviderProfile
);

export const ProfileRoutes = router;
