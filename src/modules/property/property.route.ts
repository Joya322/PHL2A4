import { Router } from "express";
import { propertyControllers } from "./property.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

// router.post("/", auth(UserRole.LANDLORD), propertyControllers.addProperty);

router.get("/", auth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT), propertyControllers.getAllProperties);

router.get(
  "/:propertyId",
  auth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT),
  propertyControllers.getPropertyById,
);
// ...

router.post("/categories", propertyControllers.getAllPropertyCategories);

export const propertyRoutes = router;
