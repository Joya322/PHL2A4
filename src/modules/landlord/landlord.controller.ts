import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { landlordServices } from "./landlord.service";

const createProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const landlordId = req.user!.id;

    const payload = req.body;

    const result = await landlordServices.createPropertyIntoDB(
      payload,
      landlordId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Property created successfully.",
      data: {
        result,
      },
    });
  },
);

const updateProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Logged in Successfully.",
      data: {
        //accessToken,
        //refreshToken,
      },
    });
  },
);

const deleteProperty = async (req: Request, res: Response) => {};
const getAllRentalRequests = async (req: Request, res: Response) => {};
const modifyRentalRequest = async (req: Request, res: Response) => {};

export const landlordControllers = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllRentalRequests,
  modifyRentalRequest,
};
