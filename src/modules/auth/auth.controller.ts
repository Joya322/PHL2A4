import { Request, Response } from "express";
import { authService } from "./auth.service";

const register = async (req: Request, res: Response) => {
  const result = await authService.registerIntoDB(req.body);

  res.send({
    success: true,
    message: "User created successfully.",
    data: result
  })
};
const login = async (req: Request, res: Response) => {};
const me = async (req: Request, res: Response) => {};

export const authController = {
  register,
  login,
  me,
};
