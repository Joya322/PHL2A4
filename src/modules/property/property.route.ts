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

router.get(
  "/:propertyId",
  auth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT),
  propertyControllers.getPropertyById,
);

router.get("/categories", propertyControllers.getAllPropertyCategories);

export const propertyRoutes = router;
