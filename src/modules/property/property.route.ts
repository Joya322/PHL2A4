import { Router } from "express";
import { propertyController } from "./property.controller";

const router = Router();

router.get("/", propertyController.getProperties);
router.get("/:id", propertyController.getProperty);
router.get("/categories", propertyController.getAllPropertyCategories);

export const propertyRoute = router;
