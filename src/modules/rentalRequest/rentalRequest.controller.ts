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
    const userId = req.user!.id;

    const userRole = req.user!.role;

    const result = await rentalRequestServices.getAllRentalRequestsFromDB(
      userId,
      userRole,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All rental request retrieved successfully.",
      data: {
        result,
      },
    });
  },
);

const getRentalRequestById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rentalRequestId } = req.params;
    if (!rentalRequestId) {
      throw new Error("Rental request id is required.");
    }

    const userId = req.user!.id;
    const userRole = req.user!.role;

    const result = await rentalRequestServices.getRentalRequestByIdFromDB(
      rentalRequestId as string,
      userId,
      userRole,
    );
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Rental request retrieved successfully.",
      data: {
        result
      },
    });
  },
);

export const rentalRequestControllers = {
  createRentalRequest,
  getAllRentalRequests,
  getRentalRequestById,
};
