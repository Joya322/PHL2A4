import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
  const result = await authService.userRegistrationIntoDB(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User created successfully.",
    data: result,
  });
};
const login = async (req: Request, res: Response) => {};
const me = async (req: Request, res: Response) => {};

export const authController = {
  userRegistration,
  login,
  me,
};
