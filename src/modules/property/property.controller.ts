import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { propertyServices } from "./property.service";

const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    const result = await propertyServices.getAllPropertiesFromDB(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All properties retrieved successfully.",
      data: {
        result,
      },
    });
  },
);

const getPropertyById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { propertyId } = req.params;

    if (!propertyId) {
      throw new Error("Property id is required.");
    }

    const result = await propertyServices.getPropertyByIdFromDB(
      propertyId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property retrieved successfully.",
      data: {
        result,
      },
    });
  },
);
const getAllPropertyCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await propertyServices.getAllPropertyCategoriesFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All categories retrieved successfully.",
      data: {
        result,
      },
    });
  },
);

export const propertyControllers = {
  
  getAllProperties,
  getPropertyById,
  getAllPropertyCategories,
};
