import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const userRegistration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authServices.userRegistrationIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Registered Successfully.",
      data: { user },
    });
  },
);

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const me = async (req: Request, res: Response) => {};

export const authControllers = {
  userRegistration,
  login,
  me,
};
