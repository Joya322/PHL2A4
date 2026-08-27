import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { categoryServices } from "./category.service";

const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await categoryServices.createCategoryIntoDB(payload);

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
        result,
      },
    });
  },
);

const getPropertyCategoryById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params?.categoryId;

    const result = await categoryServices.getPropertyCategoryByIdFromDB(
      categoryId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category retrieved successfully.",
      data: {
        result,
      },
    });
  },
);

const updatePropertyCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params?.categoryId;

    const payload = req.body;

    const result = await categoryServices.updatePropertyCategoryIntoDB(
      categoryId as string,
      payload,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category updated successfully.",
      data: {
        result,
      },
    });
  },
);

const deletePropertyCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params?.categoryId;

     await categoryServices.deletePropertyCategoryFromDB(
      categoryId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Category deleted successfully.",
      data: null
    });
  },
);

export const categoryControllers = {
  createCategory,
  getAllPropertyCategories,
  getPropertyCategoryById,
  updatePropertyCategory,
  deletePropertyCategory,
};
