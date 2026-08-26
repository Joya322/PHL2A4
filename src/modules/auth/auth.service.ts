import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ICreateUser, ILoginUser } from "./auth.interface";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

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
  const createNewUser = await prisma.user.create({
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

  const { password: _, ...userWithoutPassword } = createNewUser;

  return userWithoutPassword;
};

const loginIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  if (user.status === "BLOCKED") {
    throw new Error(
      "Your account has been blocked. Please contact for support.",
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Invalid Credentials.");
  }

  const jwtPayload = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    payload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return { accessToken, refreshToken };
};

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    },
    omit: {
      password: true
    }
  })

  return user
};

export const authServices = {
  userRegistrationIntoDB,
  loginIntoDB,
  getMyProfileFromDB,
};
