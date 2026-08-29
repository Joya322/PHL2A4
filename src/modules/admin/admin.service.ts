import { prisma } from "../../lib/prisma";
import { IUpdateStatusPayload } from "./admin.interface";

const getAllUsersFromDB = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

const updateUserStatusIntoDB = async (payload: IUpdateStatusPayload, userId: string) => {
  
  const isUserExist = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!isUserExist) {
    throw new Error("No such user found.");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id:userId,
    },
    data: {
      ...payload,
    },
  });

  return updatedUser;
};

const getAllPropertiesFromDB = async () => {};
const getAllRentalRequestsFromDB = async () => {};

export const adminServices = {
  getAllUsersFromDB,
  updateUserStatusIntoDB,
  getAllPropertiesFromDB,
  getAllRentalRequestsFromDB,
};
