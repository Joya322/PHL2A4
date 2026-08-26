import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const userRegistration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.userRegistrationIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully.",
      data: { user },
    });
  },
);

const login = async (req: Request, res: Response) => {};
const me = async (req: Request, res: Response) => {};

export const authController = {
  userRegistration,
  login,
  me,
};
