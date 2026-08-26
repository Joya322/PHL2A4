import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { propertyServices } from "./property.service";

const addProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const landlordId = req.user?.id;

    const payload = req.body;

    const result = await propertyServices.addPropertyIntoDB(
      payload,
      landlordId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Property added successfully.",
      data: {
        result,
      },
    });
  },
);

const getAllProperties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    
    const result = await propertyServices.getAllPropertiesFromDB(query);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All properties retrieved successfully.",
      data: {
        result
      },
    });
  },
);

const getPropertyById = catchAsync(
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
const getAllPropertyCategories = catchAsync(
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

export const propertyControllers = {
  addProperty,
  getAllProperties,
  getPropertyById,
  getAllPropertyCategories,
};
