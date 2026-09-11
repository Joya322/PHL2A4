import { Router } from "express";
import { adminControllers } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get("/users", auth(UserRole.ADMIN), adminControllers.getAllUsers);

router.patch(
  "/users/:userId",
  auth(UserRole.ADMIN),
  adminControllers.updateUserStatus,
);

router.get(
  "/properties",
  auth(UserRole.ADMIN),
  adminControllers.getAllProperties,
);

router.get(
  "/rentals",
  auth(UserRole.ADMIN),
  adminControllers.getAllRentalRequests,
);

export const adminRoutes = router;
