import { prisma } from "../../lib/prisma";
import { ICreatePropertyPayload } from "./landlord.interface";

const createPropertyIntoDB = async (
  payload: ICreatePropertyPayload,
  landlordId: string,
) => {
  const { categoryId } = payload;

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("Invalid category.");
  }

  const existingProperty = await prisma.property.findFirst({
    where: {
      ...payload,
      landlordId,
    },
  });

  if (existingProperty) {
    throw new Error("This property is already exist. Please try another.");
  }

  const property = await prisma.property.create({
    data: {
      ...payload,
      landlordId,
    },
  });

  return property;
};
const updatePropertyIntoDB = async () => {};
const deletePropertyFromDB = async () => {};
const getAllRentalRequestsFromDB = async () => {};
const modifyRentalRequestIntoDB = async () => {};

export const landlordServices = {
  createPropertyIntoDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
  getAllRentalRequestsFromDB,
  modifyRentalRequestIntoDB,
};
