import { UserRole } from "../../../generated/prisma/enums";

export interface ICreateUserPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  profileImage?: string;
  role: UserRole;
  address?: string;
}
export interface ILoginUserPayload {
  email: string;
  password: string;
}
