import { UserStatus } from "../../../generated/prisma/enums";

export interface IUpdateStatusPayload {
  isVerified?: boolean;
  status?: UserStatus;
}
