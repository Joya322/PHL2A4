import { Router } from "express";

import { categoryControllers } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(UserRole.ADMIN), categoryControllers.createCategory);

router.get("/:categoryId", categoryControllers.getPropertyCategoryById);

router.put(
  "/:categoryId",
  auth(UserRole.ADMIN),
  categoryControllers.updatePropertyCategory,
);

router.delete(
  "/:categoryId",
  auth(UserRole.ADMIN),
  categoryControllers.deletePropertyCategory,
);

export const categoryRoutes = router;
