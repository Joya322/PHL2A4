import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus  from 'http-status';
import { rentalRequestService } from "./rentalRequest.service";

const createRentalRequest = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenantId = req.user!.id;

    const payload = req.body;
    if (!payload) {
      throw new Error("Nothing to create.");
    }

    const result = await rentalRequestService.createRentalRequestIntoDB(
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
const getAllRentalRequests = async (req: Request, res: Response) => {};
const getRentalRequest = async (req: Request, res: Response) => {};

export const rentalRequestController = {
  createRentalRequest,
  getAllRentalRequests,
  getRentalRequest,
};
