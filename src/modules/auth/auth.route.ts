import { Router } from "express";
import { authControllers } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", authControllers.userRegistration);

router.post("/login", authControllers.login);

router.get(
  "/me",
  auth(UserRole.ADMIN, UserRole.TENANT, UserRole.LANDLORD),
  authControllers.getMyProfile,
);

export const authRoutes = router;
