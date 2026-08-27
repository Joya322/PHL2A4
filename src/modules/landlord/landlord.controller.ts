import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { landlordServices } from "./landlord.service";
import { UserRole } from "../../../generated/prisma/enums";

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
    const { propertyId } = req.params;
    if (!propertyId) {
      throw new Error("Property id is required.");
    }

    const payload = req.body;
    if (!payload) {
      throw new Error("Nothing to update.");
    }

    const userId = req.user!.id;
    const isAdmin = req.user!.role === UserRole.ADMIN;

    const result = await landlordServices.updatePropertyIntoDB(
      propertyId as string,
      payload,
      userId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property updated successfully.",
      data: {
        result,
      },
    });
  },
);

const deleteProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { propertyId } = req.params;
    if (!propertyId) {
      throw new Error("Property id is required.");
    }

    const result = await landlordServices.deletePropertyFromDB(
      propertyId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property deleted successfully.",
      data: {
        result,
      },
    });
  },
);

const getAllRentalRequests = async (req: Request, res: Response) => {};
const modifyRentalRequest = async (req: Request, res: Response) => {};

export const landlordControllers = {
  createProperty,
  updateProperty,
  deleteProperty,
  getAllRentalRequests,
  modifyRentalRequest,
};
