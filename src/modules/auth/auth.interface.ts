import { UserRole } from "../../../generated/prisma/enums";

export interface ICreateUser {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  profileImage?: string;
  role: UserRole;
  address?: string;
}
