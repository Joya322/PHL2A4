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

const updateUserStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    if (!userId) {
      throw new Error("User id required.");
    }

    const payload = req.body;
    if (!payload) {
      throw new Error("Nothing to be change.");
    }

    const result = await adminServices.updateUserStatusIntoDB(
      payload,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User updated successfully.",
      data: {
        result,
      },
    });
  },
);

const getAllProperties = async (req: Request, res: Response) => {};
const getAllRentalRequests = async (req: Request, res: Response) => {};

export const adminControllers = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentalRequests,
};
