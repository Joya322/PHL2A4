import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ICreateUser } from "./auth.interface";
import config from "../../config";

const userRegistrationIntoDB = async (payload: ICreateUser) => {
  const { fullName, email, password, phone, role, profileImage, address } =
    payload;

  // find existing user
  const isUserExist = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload.email }, { phone: payload.phone }],
    },
  });

  // check if the user already exist or not
  if (isUserExist) {
    throw new Error("The user already exist.");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  // create user into db
  const newUser = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      phone,
      profileImage,
      role,
      address,
    },
  });

  const { password: _, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};

const loginIntoDB = () => {};
const meFromDB = () => {};

export const authService = {
  userRegistrationIntoDB,
  loginIntoDB,
  meFromDB,
};
