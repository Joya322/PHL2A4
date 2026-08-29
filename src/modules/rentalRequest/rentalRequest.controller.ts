import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { rentalRequestServices } from "./rentalRequest.service";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user!.id;

    const payload = req.body;
    if (!payload) {
      throw new Error("Nothing to create.");
    }

    const result = await rentalRequestServices.createRentalRequestIntoDB(
      tenantId,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Rental request created successfully.",
      data: {
        result,
      },
    });
  },
);

const getAllRentalRequests = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user!.id;

    const result = await rentalRequestServices.getAllRentalRequestsFromDB(tenantId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All rental request retrieved successfully.",
      data: {
        result
      },
    });
  },
);

const getRentalRequest = async (req: Request, res: Response) => {};

export const rentalRequestControllers = {
  createRentalRequest,
  getAllRentalRequests,
  getRentalRequest,
};
