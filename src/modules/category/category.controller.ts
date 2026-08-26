import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { categoryServices } from "./category.service";

const addPropertyCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await categoryServices.addPropertyCategoryIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Category added successfully.",
      data: {
        result,
      },
    });
  },
);

const getAllPropertyCategories = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryServices.getAllPropertyCategoriesFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "All categories retrieved successfully.",
      data: {
        result
      },
    });
  },
);
// const getPropertyById = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "User Logged in Successfully.",
//       data: {
//         //accessToken,
//         //refreshToken,
//       },
//     });
//   },
// );
// const getAllPropertyCategories = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: "User Logged in Successfully.",
//       data: {
//         //accessToken,
//         //refreshToken,
//       },
//     });
//   },
// );

export const categoryControllers = {
  addPropertyCategory,
  getAllPropertyCategories,
};
