import { Request, Response } from "express";
import { ICreateRentalRequestPayload } from "./rentalRequest.interface";
import { prisma } from "../../lib/prisma";

const createRentalRequestIntoDB = async (
  tenantId: string,
  payload: ICreateRentalRequestPayload,
) => {
  const { propertyId } = payload;

  const isPropertyExist = await prisma.property.findFirst({
    where: {
      id: propertyId,
    },
  });

  if (!isPropertyExist) {
    throw new Error("No such property exist.");
  }

  const { landlordId, isAvailable } = isPropertyExist;

  if (!isAvailable) {
    throw new Error("Sorry! This property is not available now.");
  }

  const rentalRequest = await prisma.rentalRequest.create({
    data: {
      ...payload,
      landlordId,
      propertyId,
      tenantId,
    },
  });

  return rentalRequest;
};

const getAllRentalRequestsFromDB = async () => {};
const getRentalRequestFromDB = async () => {};

export const rentalRequestService = {
  createRentalRequestIntoDB,
  getAllRentalRequestsFromDB,
  getRentalRequestFromDB,
};
