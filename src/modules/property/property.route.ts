import { Router } from "express";
import { propertyControllers } from "./property.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.LANDLORD), propertyControllers.addProperty);

// ...
router.get("/", propertyControllers.getAllProperties);
router.get("/:id", propertyControllers.getPropertyById);

router.post("/categories", propertyControllers.getAllPropertyCategories);
router.get("/categories", propertyControllers.getAllPropertyCategories);

export const propertyRoutes = router;
