import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.get("/users", adminController.getAllUsers);
router.patch("/users/:id", adminController.modifyUserStatus);
router.get("/properties", adminController.getAllProperties);
router.get("/rentals", adminController.getAllRentalRequests);

export const adminRoute = router;
