import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { adminServices } from "./admin.service";

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.getAllUsersFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All users retrieved successfully.",
      data: {
        result,
      },
    });
  },
);

const modifyUserStatus = async (req: Request, res: Response) => {};
const getAllProperties = async (req: Request, res: Response) => {};
const getAllRentalRequests = async (req: Request, res: Response) => {};

export const adminControllers = {
  getAllUsers,
  modifyUserStatus,
  getAllProperties,
  getAllRentalRequests,
};
