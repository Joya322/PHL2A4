import { Request, Response } from "express";

const createNewProperty = async (req: Request, res: Response) => {};
const updateProperty = async (req: Request, res: Response) => {};
const deleteProperty = async (req: Request, res: Response) => {};
const getAllRentalRequests = async (req: Request, res: Response) => {};
const modifyRentalRequest = async (req: Request, res: Response) => {};

export const landlordController = {
  createNewProperty,
  updateProperty,
  deleteProperty,
  getAllRentalRequests,
  modifyRentalRequest,
};
