import { Request, Response } from "express";

const submitRentalRequest = async (req: Request, res: Response) => {};
const getAllRentalRequests = async (req: Request, res: Response) => {};
const getRentalRequest = async (req: Request, res: Response) => {};

export const rentalRequestController = {
  submitRentalRequest,
  getAllRentalRequests,
  getRentalRequest,
};
