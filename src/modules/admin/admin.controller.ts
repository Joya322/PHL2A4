import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {};
const modifyUserStatus = async (req: Request, res: Response) => {};
const getAllProperties = async (req: Request, res: Response) => {};
const getAllRentalRequests = async (req: Request, res: Response) => {};

export const adminController = {
  getAllUsers,
  modifyUserStatus,
  getAllProperties,
  getAllRentalRequests,
};
