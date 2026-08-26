import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status';
import { propertyServices } from "./property.service";

const addProperty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await propertyServices.addPropertyIntoDB(payload);
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Property added successfully.",
      data: {
        //result
      },
    });
  },
);


const getProperties = catchAsync(
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
  getProperties,
  getPropertyById,
  getAllPropertyCategories,
};
