import { prisma } from "../../lib/prisma";
import {
  IChangeStatusPayload,
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

const deletePropertyFromDB = async (
  propertyId: string,
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
    throw new Error("You have no permission to delete this property.");
  }

  await prisma.property.delete({
    where: {
      id: propertyId,
    },
  });
};

const getAllRentalRequestsForMyPropertiesFromDB = async (
  landlordId: string,
) => {
  const allRentalRequests = await prisma.rentalRequest.findMany({
    where: {
      landlordId,
    },
  });

  return allRentalRequests;
};

const changeRentalRequestStatusIntoDB = async (
  landlordId: string,
  rentalRequestId: string,
  payload: IChangeStatusPayload,
) => {
  const isRentalRequestExist = await prisma.rentalRequest.findUnique({
    where: {
      id: rentalRequestId,
    },
  });

  if (!isRentalRequestExist) {
    throw new Error("No such rental request found.");
  }

  if (landlordId !== isRentalRequestExist.landlordId) {
    throw new Error("You have no permission to access this resource.");
  }

  const updatedRentalRequest = await prisma.rentalRequest.update({
    where: {
      id: rentalRequestId,
    },
    data: {
      status: payload.status,
    },
  });

  return updatedRentalRequest;
};

export const landlordServices = {
  createPropertyIntoDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
  getAllRentalRequestsForMyPropertiesFromDB,
  changeRentalRequestStatusIntoDB,
};
