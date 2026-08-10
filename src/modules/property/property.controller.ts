import { Request, Response } from "express";

const getProperties = async (req: Request, res: Response) => {};
const getProperty = async (req: Request, res: Response) => {};
const getAllPropertyCategories = async (req: Request, res: Response) => {};

export const propertyController = {
  getProperties,
  getProperty,
  getAllPropertyCategories,
};
