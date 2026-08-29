import { prisma } from "../../lib/prisma";

const getAllUsersFromDB = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};

const modifyUserStatusIntoDB = async () => {};
const getAllPropertiesFromDB = async () => {};
const getAllRentalRequestsFromDB = async () => {};

export const adminServices = {
  getAllUsersFromDB,
  modifyUserStatusIntoDB,
  getAllPropertiesFromDB,
  getAllRentalRequestsFromDB,
};
