import { Router } from "express";
import { propertyControllers } from "./property.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();
// all api done
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT),
  propertyControllers.getAllProperties,
);

router.get("/categories", propertyControllers.getAllPropertyCategories);

router.get(
  "/:propertyId",
  auth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT),
  propertyControllers.getPropertyById,
);

export const propertyRoutes = router;
