import { Router } from "express";
import { adminControllers } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.get("/users", auth(UserRole.ADMIN), adminControllers.getAllUsers);

router.patch("/users/:userId", adminControllers.updateUserStatus);
// ...
router.get("/properties", adminControllers.getAllProperties);
router.get("/rentals", adminControllers.getAllRentalRequests);

export const adminRoute = router;
