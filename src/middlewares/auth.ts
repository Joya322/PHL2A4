import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";

export const auth = (...requiredRoles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        
    })
}