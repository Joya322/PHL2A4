import { prisma } from "../../lib/prisma";
import {
  ICreatePropertyPayload,
  IUpdatePropertyPayload,
} from "./landlord.interface";

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

const updatePropertyIntoDB = async (
  propertyId: string,
  payload: IUpdatePropertyPayload,
  userId: string,
  isAdmin: boolean,
) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property) {
    throw new Error("No such property is exist.");
  }

  if (!isAdmin && property.landlordId !== userId) {
    throw new Error("You have no permission to update this property.");
  }

  const noChange = await prisma.property.findFirst({
    where: {
      ...payload,
      id: propertyId,
    },
  });
  if (noChange) {
    throw new Error("Everything is updated.");
  }

  const updatedProperty = await prisma.property.update({
    where: {
      id: propertyId,
    },
    data: {
      ...payload,
    },
  });

  return updatedProperty;
};

const deletePropertyFromDB = async (propertyId: string, userId: string, isAdmin: boolean) => {
  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  if (!property) {
    throw new Error("No such property is exist.");
  }

  if (!isAdmin && property.landlordId !== userId) {
    throw new Error("You have no permission to delete this property.");
  }

  await prisma.property.delete({
    where: {
      id: propertyId
    }
  })
  
};
const getAllRentalRequestsFromDB = async () => {};
const modifyRentalRequestIntoDB = async () => {};

export const landlordServices = {
  createPropertyIntoDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
  getAllRentalRequestsFromDB,
  modifyRentalRequestIntoDB,
};
