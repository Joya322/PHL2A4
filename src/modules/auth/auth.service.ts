import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IPayload } from "./auth.interface";
import config from "../../config";

const registerIntoDB = async (payload: IPayload) => {
  const { fullName, email, password, phone, role, profileImage, address } =
    payload;

  // find existing user
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { phone: payload.phone }],
    },
  });

  // check if the user already exist or not
  if (existingUser) {
    throw new Error("The user already exist.");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  console.log(hashedPassword);
};
const loginIntoDB = () => {};
const meFromDB = () => {};

export const authService = {
  registerIntoDB,
  loginIntoDB,
  meFromDB,
};
