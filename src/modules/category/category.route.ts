import { Router } from "express";

import { categoryControllers } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.ADMIN), categoryControllers.addPropertyCategory);

router.get("/", categoryControllers.getAllPropertyCategories);

router.get("/:categoryId", categoryControllers.getPropertyCategoryById);

router.put("/:categoryId", categoryControllers.updatePropertyCategory);

router.delete("/:categoryId", categoryControllers.deletePropertyCategory);

export const categoryRoutes = router;
