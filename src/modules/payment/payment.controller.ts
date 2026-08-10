import { Request, Response } from "express";

const createPayment = async (req: Request, res: Response) => {};
const confirmPayment = async (req: Request, res: Response) => {};
const getAllPayments = async (req: Request, res: Response) => {};
const getPayment = async (req: Request, res: Response) => {};

export const paymentController = {
  createPayment,
  confirmPayment,
  getAllPayments,
  getPayment,
};
