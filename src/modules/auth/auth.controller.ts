import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";

const userRegistration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.userRegistrationIntoDB(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully.",
      data: { result },
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to register user.",
      error: (error as Error).message
    });
  }
};
const login = async (req: Request, res: Response) => {};
const me = async (req: Request, res: Response) => {};

export const authController = {
  userRegistration,
  login,
  me,
};
